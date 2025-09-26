import React, { useState } from 'react';
import { Container, CssBaseline, createTheme, ThemeProvider, Pagination } from '@mui/material';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import RecordForm from './components/RecordForm';
import RecordGroup from './components/RecordGroup';
import Filters from './components/Filters';
import ExportCSV from './components/ExportCSV';

function groupByDate(records) {
  return records.reduce((acc, rec) => {
    if (!acc[rec.date]) acc[rec.date] = [];
      acc[rec.date].push(rec);
    return acc;
  }, {});
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [records, setRecords] = useLocalStorage('gate-tracker-records', []);
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchNote, setSearchNote] = useState('');
  const [editRecord, setEditRecord] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  function handleSave(record) {
    if (record.id) {
      setRecords(records.map(r => r.id === record.id ? record : r));
    } else {
      record.id = Math.random().toString(36).slice(2);
      setRecords([{ ...record }, ...records]);
    }
    setEditRecord(null);
  }


  function handleDelete(id) {
    setRecords(records.filter(r => r.id !== id));
  }


// filtering
  const filtered = records.filter(r => {
    if (filterSubject !== 'all' && r.subject !== filterSubject) return false;
    if (filterType !== 'all' && r.type !== filterType) return false;
    if (searchNote && !r.note.toLowerCase().includes(searchNote.toLowerCase())) return false;
    return true;
  });


  const theme = createTheme({ palette: { mode: dark ? 'dark' : 'light' } });


  // pagination
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);


  const grouped = groupByDate(paginated);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header dark={dark} setDark={setDark} />
      <Container>
        <RecordForm onSave={handleSave} editRecord={editRecord} />
        <Filters
          filterSubject={filterSubject}
          setFilterSubject={setFilterSubject}
          filterType={filterType}
          setFilterType={setFilterType}
          searchNote={searchNote}
          setSearchNote={setSearchNote}
        />
        <ExportCSV records={filtered} />
        {Object.keys(grouped).map(date => (
          <RecordGroup key={date} date={date} records={grouped[date]} onEdit={setEditRecord} onDelete={handleDelete} />
        ))}
        <Pagination count={Math.ceil(filtered.length / PAGE_SIZE)} page={page} onChange={(e, val) => setPage(val)} />
      </Container>
    </ThemeProvider>
  );
}