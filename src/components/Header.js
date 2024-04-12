import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black', borderBottom: '2px solid white' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h2" component="div" sx={{ color: 'white', fontFamily: 'Arial, sans-serif', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '2rem', }}>
          To-Do List
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
