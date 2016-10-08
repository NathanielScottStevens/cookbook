import React, { Component, PropTypes } from 'react';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

import AppBar from 'material-ui/AppBar';
import Navigation from '../components/Navigation';
import RecipeCategoriesContainer from '../../ui/containers/RecipeCategories';
import RecipeListContainer from '../../ui/containers/RecipeList';
import RecipeContainer from '../../ui/containers/Recipe';
import NotFound from '../../ui/pages/NotFound';


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
          <Match exactly pattern="/recipes" component={RecipeCategoriesContainer} />
          <Match exactly pattern="/recipes/:id" component={RecipeListContainer} />
          <Match exactly pattern="/recipes/:id/:id" component={RecipeContainer} />
          <Miss component={NotFound} />
        </main>
      </div>
    );
  }
}

RecipeSelection.propTypes = {
  width: PropTypes.number,
};

export default withWidth()(RecipeSelection);
