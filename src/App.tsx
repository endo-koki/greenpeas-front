import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainPage } from './components/pages/MainPage';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: 'white',
    },
  },
});

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <ThemeProvider theme={theme}>
            <MainPage />
          </ThemeProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
