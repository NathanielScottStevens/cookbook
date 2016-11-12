import React, { Component, PropTypes } from 'react';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import CustomAppBar from './CustomAppBar';
import Navigation from './Navigation';

class AppBarNavigation extends Component {
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
    return (
      <div>
        <CustomAppBar
          onMenuChange={() => { this.toggleMenu(); }}
        >
          {this.props.children}
        </CustomAppBar>
        <Navigation
          open={isMenuOpen}
          docked={isMenuDocked}
          onChange={() => { this.toggleMenu(); }}
        />
      </div>
    );
  }
}

AppBarNavigation.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
};

export default withWidth()(AppBarNavigation);
