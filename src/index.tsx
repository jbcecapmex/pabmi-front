import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

const theme = createTheme({
  palette:{
    primary:{
      light:"#404040",
      main:"#000000",
      dark:"#000000", 
    },
    secondary:{
      light:"#707070",
      main:"#5C5C5C",
      dark:"#444444", 
    },
    },
})

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

