import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

import Layout from 'components/layout/Layout';
import Home from 'pages/home/Home';
import People from 'pages/people/People';
import Support from 'pages/support/Support';
import CssBaseline from '@mui/material/CssBaseline';

const App = (): JSX.Element => {
  const theme = createTheme({
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          color: 'inherit',
          underline: 'none',
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
          root: {
            '&.Mui-disabled': {
              cursor: 'not-allowed !important',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
