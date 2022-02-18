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
import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" noWrap>
            Ceneo scrapper
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" sx={{ pt: 1.25 }}>Collections</Button>
            <Button color="inherit" sx={{ pt: 1.25 }}>Products</Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button color="inherit" sx={{ pt: 1.25 }}>Sign up</Button>
            <Button color="inherit" sx={{ pt: 1.25 }}>Login</Button>
          </Box>
        </Toolbar>
    </AppBar>
    <Container component="main" sx={{ mt: 4, mb: 4 }}>
      {/* <Collections /> */}
      <Products id={2}/>
      {/* <AddProduct /> */}
      {/* <AddCollection /> */}
    </Container>
  </ThemeProvider>,
  document.querySelector('#root'),
);
