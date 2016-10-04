import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Navigation from '../components/Navigation';
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth';
import { IndexLink, Link } from 'react-router';

import {GridList, GridTile} from 'material-ui/GridList';

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

    const styles = {
      root: {
        paddingLeft: isMenuDocked ? 256 : 0,
        margin: 50,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {},
      gridTile: {},
    };

    return (
      <div>
        <AppBar
          title="Cookbook"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={() => { this.toggleMenu(); }}
        />
        <Navigation
          open={isMenuOpen}
          docked={isMenuDocked}
          onChange={() => { this.toggleMenu(); }}
        />
        <main style={styles.root}>
          <GridList
            cellHeight={300}
            style={styles.gridList}
            children={4}
            cols={this.props.width === SMALL ? 1 : 2}
            padding={50}
          >
            <GridTile title="Salad" style={styles.gridTile} onClick={() => {alert("asdf");}}>
              <img src="images/salad.jpg" />
            </GridTile>
            <GridTile title="Entree" style={styles.gridTile}>
              <img src="images/entree.jpg" />
            </GridTile>
            <GridTile title="Side Dish" style={styles.gridTile}>
              <img src="images/side-dish.jpg" />
            </GridTile>
            <GridTile title="Dessert" style={styles.gridTile}>
              <img src="images/dessert.jpg" />
            </GridTile>
          </GridList>
        </main>
      </div>
    );
  }
}

export default withWidth()(Index);
