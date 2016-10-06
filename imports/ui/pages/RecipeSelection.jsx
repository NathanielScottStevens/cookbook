import React, { Component, PropTypes } from 'react';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';

import AppBar from 'material-ui/AppBar';
import Navigation from '../components/Navigation';


class RecipeSelection extends Component {
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
          { this.props.children }
        </main>
      </div>
    );
  }
}

RecipeSelection.propTypes = {
  children: PropTypes.object,
  width: PropTypes.number,
};

export default withWidth()(RecipeSelection);
