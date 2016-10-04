import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { IndexLink, Link } from 'react-router';
import { spacing, typography } from 'material-ui/styles';
import { cyan500 } from 'material-ui/styles/colors';


const styles = {
  header: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
};

class Navigation extends Component {

  render() {
    return (
      <Drawer
        open={this.props.open}
        onRequestChange={() => { this.props.onChange(); }}
        docked={this.props.docked}
      >
        <div style={styles.header}>
          Game Master
        </div>
        <MenuItem>
          <IndexLink to="/">
            Index
          </IndexLink>
        </MenuItem>
        <MenuItem>
          Item 1
        </MenuItem>
      </Drawer>
    );
  }
}

Navigation.propTypes = {
  open: PropTypes.bool,
  docked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Navigation;
