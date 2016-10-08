import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { GridList, GridTile } from 'material-ui/GridList';

class RecipeList extends Component {
  constructor(props) {
    super(props);
  }

  renderItems(styles) {
    return this.props.recipes.map(recipe =>
      <Link to={`/recipes/${recipe.type}/${recipe.slug}`}>
        <GridTile title={recipe.name} key={recipe._id} style={styles.gridTile} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
          <img style={styles.img} src={`../../images/${recipe.img}`} />
        </GridTile>
      </Link>
    );
  }

  render() {
    if (this.props.isLoading) {
      return (<div>Loading...</div>);
    }

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
          cols={1}
          children={this.props.recipes.length}
          padding={50}
        >
          { this.renderItems(styles) }
        </GridList>
      </div>
    );
  }
}

RecipeList.propTypes = {
  isLoading: PropTypes.bool,
  recipes: PropTypes.array,
};

export default RecipeList;
