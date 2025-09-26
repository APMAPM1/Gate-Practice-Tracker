import React from 'react';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import { downloadCSV } from '../utils/csv';

export default function ExportCSV({ records }) {
    return (
        <Button variant="outlined" startIcon={<Download />} onClick={() => downloadCSV('gate-tracker.csv', records)}>
        Export CSV
        </Button>
    );
}