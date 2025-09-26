import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  useTheme
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function RecordGroup({ date, records, onEdit, onDelete }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 75) return 'success.main';
    if (accuracy >= 50) return 'warning.main';
    return 'error.main';
  };

  return (
    <Paper
      sx={{
        m: 2,
        p: 2,
        backgroundColor: isDark ? '#121212' : '#f9fafb',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}
      >
        {date}
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: isDark ? '#1e1e1e' : 'primary.main',
            }}
          >
            {[
              'Subject',
              'Type',
              'Total',
              'Correct',
              'Wrong',
              'Skipped',
              'Marks',
              'Accuracy %',
              'Note',
              'Actions',
            ].map((head) => (
              <TableCell
                key={head}
                sx={{ color: isDark ? 'grey.300' : 'white', fontWeight: 'bold' }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {records.map((r) => (
            <TableRow
              key={r.id}
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: isDark ? '#1e1e1e' : '#f1f5f9',
                },
                '&:hover': {
                  backgroundColor: isDark ? '#333' : '#e3f2fd',
                },
              }}
            >
              <TableCell>{r.subject}</TableCell>
              <TableCell>{r.type}</TableCell>
              <TableCell>{r.totalQuestions}</TableCell>
              <TableCell sx={{ color: 'success.main', fontWeight: 'bold' }}>
                {r.correct}
              </TableCell>
              <TableCell sx={{ color: 'error.main' }}>{r.wrong}</TableCell>
              <TableCell sx={{ color: 'warning.main' }}>{r.skipped}</TableCell>
              <TableCell>{r.marks}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: getAccuracyColor(r.accuracy) }}>
                {r.accuracy}%
              </TableCell>
              <TableCell>{r.note}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(r)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(r.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
