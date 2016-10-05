import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL } from 'material-ui/utils/withWidth';
import { Link } from 'react-router';

import { GridList, GridTile } from 'material-ui/GridList';

class RecipeCategories extends Component {
  constructor(props) {
    super(props);

    this.state = { isMenuOpen: false };
  }

  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    const styles = {
      gridList: {},
      gridTile: {},
    };

    return (
      <div>
        <GridList
          cellHeight={300}
          style={styles.gridList}
          children={4}
          cols={this.props.width === SMALL ? 1 : 2}
          padding={50}
        >
          <Link to="recipes/category/salad">
            <GridTile title="Salad" style={styles.gridTile}>
              <img src="../images/salad.jpg" />
            </GridTile>
          </Link>
          <Link to="recipes/category/entree">
            <GridTile title="Entree" style={styles.gridTile}>
              <img src="../images/entree.jpg" />
            </GridTile>
          </Link>
          <Link to="recipes/category/side">
            <GridTile title="Side Dish" style={styles.gridTile}>
              <img src="../images/side-dish.jpg" />
            </GridTile>
          </Link>
          <Link to="recipes/category/dessert">
            <GridTile title="Dessert" style={styles.gridTile}>
              <img src="../images/dessert.jpg" />
            </GridTile>
          </Link>
        </GridList>
      </div>
    );
  }
}

RecipeCategories.propTypes = {
  width: PropTypes.number,
};

export default withWidth()(RecipeCategories);
