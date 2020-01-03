import React from 'react';

import Homepage from '../pages/Homepage/Homepage';
import Manage from '../pages/Manage/Manage';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const Routes = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className='app-container'>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/Manage' component={Manage} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};
