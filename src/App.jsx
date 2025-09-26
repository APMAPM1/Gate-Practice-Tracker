import React, { useState } from 'react';
import { Container, CssBaseline, createTheme, ThemeProvider, Pagination, Button, Dialog, Grid, Box, TextField, MenuItem } from '@mui/material';
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
  const [openForm, setOpenForm] = useState(false);
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

  function groupByField(records, field) {
    return records.reduce((acc, rec) => {
      const key = rec[field];
      if (!acc[key]) acc[key] = [];
      acc[key].push(rec);
      return acc;
    }, {});
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

  const [groupBy, setGroupBy] = useState('date');

  const grouped = groupBy === 'date'
    ? groupByDate(paginated)
    : groupByField(paginated, groupBy);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header dark={dark} setDark={setDark} />
      <Container>

        {/* Dialog for Form */}
        <Dialog open={openForm || !!editRecord} onClose={() => { setOpenForm(false); setEditRecord(null); }}>
          <RecordForm
            onSave={(record) => {
              handleSave(record);
              setOpenForm(false);
            }}
            editRecord={editRecord}
            subjects={[...new Set(records.map(r => r.subject))]}
          />
        </Dialog>

        {/* Filters + Right-side Controls */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} md={9}>
            <Filters
              filterSubject={filterSubject}
              setFilterSubject={setFilterSubject}
              filterType={filterType}
              setFilterType={setFilterType}
              searchNote={searchNote}
              setSearchNote={setSearchNote}
              subjects={[...new Set(records.map(r => r.subject).filter(Boolean))]}
            />
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <TextField
              select
              size="small"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="subject">Subject</MenuItem>
              <MenuItem value="type">Type</MenuItem>
            </TextField>
            <ExportCSV records={filtered} />
            <Button variant="contained" onClick={() => setOpenForm(true)}>Add Record</Button>
          </Grid>
        </Grid>

        {/* Records */}
        {Object.keys(grouped).map(groupKey => (
          <RecordGroup
            key={groupKey}
            date={groupKey}
            records={grouped[groupKey]}
            onEdit={setEditRecord}
            onDelete={handleDelete}
          />
        ))}

        {/* Pagination */}
        <Pagination
          count={Math.ceil(filtered.length / PAGE_SIZE)}
          page={page}
          onChange={(e, val) => setPage(val)}
          sx={{ mt: 2 }}
        />

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            textAlign: "center",
            py: 2,
            color: "gray",
            mt: 4,
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          © 2025 Adi Ajudia. All rights reserved.
        </Box>

      </Container>
    </ThemeProvider>
  );
}
