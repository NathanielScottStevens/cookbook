import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Navigation from '../components/Navigation';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import { IndexLink, Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';

class Index extends Component {
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

    const style = {
      paddingLeft: isMenuDocked ? 256 : 0,
      margin: 50,
    }

    return (
      <div>
        <AppBar
          title="Game Master"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={() => { this.toggleMenu(); }}
        />
        <Navigation
          open={isMenuOpen}
          docked={isMenuDocked}
          onChange={() => { this.toggleMenu(); }}
        />
        <div style={style}>

        </div>
      </div>
    );
  }
}

export default withWidth()(Index);
