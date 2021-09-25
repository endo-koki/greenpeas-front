import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoadPage } from './components/pages/LoadPage';
import { MainPage } from './components/pages/MainPage';
import { OldApp } from './OldApp';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: 'white',
    },
  },
});

function App() {
  const [file, setFile] = useState(null as File | null);

  return (
    <Router>
      <Switch>
        <Route path="/old">
          <OldApp />
        </Route>
        <Route path="/load" exact>
          <LoadPage file={file} setFile={setFile} />
        </Route>
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
