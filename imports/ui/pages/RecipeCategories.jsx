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
      gridTile: {
        width: 300,
      },
      img: {
        maxWidth: 300,
      }
    };

    return (
      <div>
        <GridList
          style={styles.gridList}
          children={4}
          cols={this.props.width === SMALL ? 1 : 2}
          padding={50}
        >
          <Link to="/recipes/category/salad">
            <GridTile title="Salad" style={styles.gridTile} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
              <img style={styles.img} src="../images/salad.jpg" />
            </GridTile>
          </Link>
          <Link to="/recipes/category/entree">
            <GridTile title="Entree" style={styles.gridTile} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
              <img style={styles.img} src="../images/entree.jpg" />
            </GridTile>
          </Link>
          <Link to="/recipes/category/side">
            <GridTile title="Side Dish" style={styles.gridTile} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
              <img style={styles.img} src="../images/side-dish.jpg" />
            </GridTile>
          </Link>
          <Link to="/recipes/category/dessert">
            <GridTile title="Dessert" style={styles.gridTile} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
              <img style={styles.img} src="../images/dessert.jpg" />
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
