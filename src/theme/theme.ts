import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3C1392',
    },
    secondary: {
      main: '#C9F305',
    },
    info: {
      main: '#0288d1',
    },
    background: {
      default: '#ffffff',
      paper: '#E1F5F4',
    },
    divider: '#3C1C91',
    text: {
      secondary: '#3C1C91',
      disabled: '#808080',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  shape: {
    borderRadius: 10,
  },
});