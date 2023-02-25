import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VendorContextProvider } from '../context/VendorContext';

export const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(124, 93, 250, 1)',
      dark: 'rgba(30, 33, 57, 1)',
      light: 'rgba(146, 119, 255, 1)',
      contrastText: 'rgba(37, 41, 69, 1)',
    },
    secondary: {
      main: 'rgba(126, 136, 195, 1)',
      dark: 'rgba(12, 14, 22, 1)',
      light: 'rgba(223, 227, 250, 1)',
      contrastText: 'rgba(136, 142, 176, 1)',
    },
    custom: {
      main: 'rgba(236, 87, 87, 1)',
      dark: 'rgba(20, 22, 37, 1)',
      light: 'rgba(248, 248, 251, 1)',
      accent: 'rgba(255, 151, 151, 1)',
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <VendorContextProvider>
        <Component {...pageProps} />
      </VendorContextProvider>
    </ThemeProvider>
  );
}
