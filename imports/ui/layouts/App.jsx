import React, { Component, PropTypes } from 'react';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import Match from 'react-router/Match';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from 'react-router/BrowserRouter';

import AppBar from 'material-ui/AppBar';
import Navigation from '../components/Navigation';
import RecipeSelection from '../../ui/pages/RecipeSelection';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isMenuOpen: false };
  }

  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    let isMenuOpen = this.state.isMenuOpen;
    let isMenuDocked = false;

    if (this.props.width === LARGE) {
      isMenuOpen = true;
      isMenuDocked = true;
    }

    const styles = {
      appBar: {
        position: 'fixed',
        top: 0,
      },
      root: {
        paddingLeft: isMenuDocked ? 256 : 0,
        paddingTop: 30,
        margin: 50,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
    };

    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <AppBar
              title="Cookbook"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap={() => { this.toggleMenu(); }}
              style={styles.appBar}
            />
            <Navigation
              open={isMenuOpen}
              docked={isMenuDocked}
              onChange={() => { this.toggleMenu(); }}
            />
            <main style={styles.root}>
              <Match pattern="/" component={RecipeSelection} />
            </main>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  width: PropTypes.number,
};

export default withWidth()(App);
