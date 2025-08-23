import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

interface CustomAppBarProps {
  title: string;
  children?: React.ReactNode;
}

export const CustomAppBar = ({ title, children }: CustomAppBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <PersonIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};