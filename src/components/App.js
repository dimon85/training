import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomePage from './HomePage';

export default function App() {
  return (
    <MuiThemeProvider>
      <HomePage />
    </MuiThemeProvider>
  );
};