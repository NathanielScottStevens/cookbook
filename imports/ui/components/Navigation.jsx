import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { spacing, typography } from 'material-ui/styles';
import { cyan500 } from 'material-ui/styles/colors';


class Navigation extends Component {

  render() {
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
    return (
      <Drawer
        open={this.props.open}
        onRequestChange={() => { this.props.onChange(); }}
        docked={this.props.docked}
      >
        <div style={styles.header}>
          Cook Book
        </div>
        <Link to="/recipes">
          {
            ({ isActive, onClick }) =>
              <MenuItem
                primaryText="Recipes"
                onClick={onClick}
                style={isActive ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' } : undefined}
              />
          }
        </Link>
        <Link to="/recipes/salad">
          {
            ({ isActive, onClick }) =>
              <MenuItem
                primaryText="Salads"
                onClick={onClick}
                style={isActive ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' } : undefined}
              />
          }
        </Link>
        <Link to="/recipes/entree">
          {
            ({ isActive }) =>
              <MenuItem
                primaryText="Entrees"
                style={isActive ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' } : undefined}
              />
          }
        </Link>
        <Link to="/recipes/side">
          {
            ({ isActive }) =>
              <MenuItem
                primaryText="Sides"
                style={isActive ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' } : undefined}
              />
          }
        </Link>
        <Link to="/recipes/dessert">
          {
            ({ isActive }) =>
              <MenuItem
                primaryText="Desserts"
                style={isActive ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' } : undefined}
              />
          }
        </Link>
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
