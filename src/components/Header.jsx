import React from 'react';
import { AppBar, Toolbar, Typography, Switch, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

export default function Header({ dark, setDark }) {
    return (
        <AppBar position="sticky" color="primary" elevation={4}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    GATE Practice Tracker
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LightMode />
                    <Switch checked={dark} onChange={() => setDark(!dark)} />
                    <DarkMode />
                </Box>
            </Toolbar>
        </AppBar>
    );
}