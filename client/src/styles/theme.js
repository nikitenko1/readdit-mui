import { createTheme } from '@mui/material/styles';

export const customTheme = (darkMode) =>
  createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ffb28a' : '#FF5700',
      },
      secondary: {
        main: darkMode ? '#f3b9bb' : '#941a1c',
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          wordBreak: 'break-word',
        },
      },
    },
  });

