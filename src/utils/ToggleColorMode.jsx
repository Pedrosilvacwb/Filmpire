import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const colorModeContext = React.createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = React.useState('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <colorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </colorModeContext.Provider>
  );
};

export default ToggleColorMode;
