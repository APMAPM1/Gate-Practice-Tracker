import React from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

export default function Header({ dark, setDark }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    GATE Practice Tracker
                </Typography>
                <LightMode />
                <Switch checked={dark} onChange={() => setDark(!dark)} />
                <DarkMode />
            </Toolbar>
        </AppBar>
    );
}