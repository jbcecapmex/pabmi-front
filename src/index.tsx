import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#4D4D4D',
      main: '#000000',  
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#EAEAEA',
      main: '#7D7D7D',
      dark: '#666666',
      contrastText: '#fff',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
  <App />
  </ThemeProvider>
  </React.StrictMode>
);

