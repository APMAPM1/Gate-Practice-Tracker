import React from 'react';
import { Box, TextField, MenuItem, Grid } from '@mui/material';

export default function Filters({ subjects = [], filterSubject, setFilterSubject, filterType, setFilterType, searchNote, setSearchNote }) {
    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                {/* Subject Dropdown */}
                <Grid item xs={12} md={3}>
                    <TextField label="Subject" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} fullWidth select>
                        {/* Default Option */}
                        <MenuItem value="all">All</MenuItem>

                        {/* Dynamic Options */}
                        {subjects.map((sub, idx) => (
                        <MenuItem key={idx} value={sub}>
                            {sub}
                        </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField label="Type" value={filterType} onChange={(e) => setFilterType(e.target.value)} fullWidth select>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="PYQ">PYQ</MenuItem>
                        <MenuItem value="Workbook">Workbook</MenuItem>
                        <MenuItem value="Test Series">Test Series</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Search in notes" value={searchNote} onChange={(e) => setSearchNote(e.target.value)} fullWidth />
                </Grid>
                
            </Grid>
        </Box>
    );
}