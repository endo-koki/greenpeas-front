import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { MainPage } from './components/pages/MainPage';
import { setCalcState } from './features/allDateSlice';
import { apiRoot } from './utils';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: 'white',
    },
  },
});

function App() {
  const dispatch = useAppDispatch();

  async function wakeServer() {
    const res = await axios.get(`${apiRoot}/init`);
    if (res.data === 'ready') {
      dispatch(setCalcState('ready'));
    } else {
      alert('サーバでエラーが発生したため使用できません。');
    }
  }

  useEffect(() => {
    wakeServer();
  }, []);

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
