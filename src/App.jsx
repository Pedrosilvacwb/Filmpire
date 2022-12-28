import React from 'react';
import { CssBaseline } from '@mui/material';
import AppRoutes from './routes';
import useStyles from './components/styles';
import { NavBar } from './components';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
