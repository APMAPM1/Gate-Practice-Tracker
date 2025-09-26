import React from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function RecordGroup({ date, records, onEdit, onDelete }) {
    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Typography variant="h6">{date}</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Correct</TableCell>
                        <TableCell>Wrong</TableCell>
                        <TableCell>Skipped</TableCell>
                        <TableCell>Marks</TableCell>
                        <TableCell>Accuracy %</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records.map(r => (
                        <TableRow key={r.id}>
                            <TableCell>{r.subject}</TableCell>
                            <TableCell>{r.type}</TableCell>
                            <TableCell>{r.totalQuestions}</TableCell>
                            <TableCell>{r.correct}</TableCell>
                            <TableCell>{r.wrong}</TableCell>
                            <TableCell>{r.skipped}</TableCell>
                            <TableCell>{r.marks}</TableCell>
                            <TableCell>{r.accuracy}</TableCell>
                            <TableCell>{r.note}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(r)}><Edit /></IconButton>
                                <IconButton onClick={() => onDelete(r.id)}><Delete /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}