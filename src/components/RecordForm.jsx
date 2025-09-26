import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, MenuItem } from '@mui/material';
import { calcAccuracy } from '../utils/calcAccuracy';

export default function RecordForm({ onSave, editRecord, subjects = [] }) {
    const [form, setForm] = useState({
        date: new Date().toISOString().slice(0, 10),
        subject: '',
        type: 'PYQ',
        totalQuestions: '',
        correct: '',
        wrong: '',
        skipped: '',
        marks: '',
        note: ''
    });

    useEffect(() => {
        if (editRecord) setForm(editRecord);
    }, [editRecord]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const accuracy = calcAccuracy(Number(form.totalQuestions), Number(form.correct));
        onSave({ ...form, accuracy });
        setForm({
            date: new Date().toISOString().slice(0, 10),
            subject: '',
            type: 'PYQ',
            totalQuestions: '',
            correct: '',
            wrong: '',
            skipped: '',
            marks: '',
            note: ''
        });
    }


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={3}><TextField type="date" label="Date" name="date" value={form.date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }}/></Grid>
                <Grid item xs={6} md={3}><TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} fullWidth >
                    {/* Allow typing a new subject */}
                        <MenuItem value="">
                            <em>-- Select / Enter Subject --</em>
                        </MenuItem>

                        {subjects.map((sub, idx) => (
                            <MenuItem key={idx} value={sub}>
                                {sub}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField select label="Type" name="type" value={form.type} onChange={handleChange} fullWidth>
                        <MenuItem value="PYQ">PYQ</MenuItem>
                        <MenuItem value="Workbook">Workbook</MenuItem>
                        <MenuItem value="Test Series">Test Series</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={6} md={3}><TextField label="Total" name="totalQuestions" value={form.totalQuestions} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={6} md={3}><TextField label="Correct" name="correct" value={form.correct} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={6} md={3}><TextField label="Wrong" name="wrong" value={form.wrong} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={6} md={3}><TextField label="Skipped" name="skipped" value={form.skipped} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={6} md={3}><TextField label="Marks" name="marks" value={form.marks} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12}><TextField label="Notes" name="note" value={form.note} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12}><Button type="submit" variant="contained">Save</Button></Grid>
            </Grid>
        </Box>
    );
}