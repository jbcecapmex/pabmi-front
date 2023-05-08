import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#E5D6C1',
      main: '#bda889',  
      dark: '#E5D6C1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#435A75',
      main: '#15212f',
      dark: 'rgba(47, 47, 47, 0.4) ',
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

