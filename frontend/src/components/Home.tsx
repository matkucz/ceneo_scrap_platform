import * as React from 'react';
import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Typography variant="h6" component="div" noWrap>
        Ceneo scrapper home page
      </Typography>
    </div>
  );
}