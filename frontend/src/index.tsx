import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './theme';
import Header from './components/Header';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <App />      
    </ThemeProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
