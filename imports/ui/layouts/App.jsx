import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';

import RecipeSelection from '../../ui/pages/RecipeSelection';


const App = () => (
  <MuiThemeProvider>
    <Router>
      <Match pattern="/" component={RecipeSelection} />
    </Router>
  </MuiThemeProvider>
);

export default App;
