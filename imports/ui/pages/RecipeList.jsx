import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { GridList, GridTile } from 'material-ui/GridList';

class RecipeList extends Component {
  constructor(props) {
    super(props);
  }

  renderItems(style) {
    return this.props.recipes.map(recipe =>
      <Link to={`/recipes/recipe/${recipe._id}`}>
        <GridTile title={recipe.name} key={recipe._id} style={style}>
          <img src={`../../images/${recipe.img}`} />
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
        width: 400,
      },
    };

    return (
      <div>
        <GridList
          cellHeight={300}
          style={styles.gridList}
          cols={1}
          children={this.props.recipes.length}
          padding={50}
        >
          { this.renderItems(styles.gridTile) }
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
