import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import OfflineProvider from './providers/OfflineProvider';
import Router from './router';
import './styles/global.css';
import { theme } from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <OfflineProvider>
        <Router/>
      </OfflineProvider>
    </ThemeProvider>
  </React.StrictMode>
);
