import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Product from './components/Product';
import Collection from './components/Collection';
import Collections from './components/Collections';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import AddCollection from './components/AddCollection';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    {/* <AddProduct /> */}
    {/* <AddCollection /> */}
    <Collections />
    <Products />
  </ThemeProvider>,
  document.querySelector('#root'),
);
