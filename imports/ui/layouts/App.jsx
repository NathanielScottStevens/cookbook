import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ children }) => (
  <MuiThemeProvider>
    { children }
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.object,
};

export default App;
