import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
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
        <Typography color="inherit" component={RouterLink} variant="h6" noWrap to="/" sx={{ textDecoration: 'none' }}>
          Ceneo scrapper
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Button component={RouterLink} color="inherit" sx={{ pt: 1.25 }} to="/collections">Collections</Button>
          {/* <Button component={RouterLink} color="inherit" sx={{ pt: 1.25 }} to="/collection/1/product">Products</Button> */}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Button color="inherit" sx={{ pt: 1.25 }}>Sign up</Button>
          <Button color="inherit" sx={{ pt: 1.25 }}>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}