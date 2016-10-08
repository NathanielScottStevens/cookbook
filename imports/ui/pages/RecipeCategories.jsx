import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL } from 'material-ui/utils/withWidth';
import { Link } from 'react-router';

import { GridList, GridTile } from 'material-ui/GridList';

class RecipeCategories extends Component {
  constructor(props) {
    super(props);

    this.state = { isMenuOpen: false };
  }

  renderItems(styles) {
    return this.props.types.map(type =>
      (<Link to={`recipes/${type.name}`}>
        <GridTile
          title={type.name}
          style={styles.gridTile}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img style={styles.img} src={`../images/${type.img}`} />
        </GridTile>
      </Link>)
    );
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

    if (this.props.isLoading) {
      return (<div />);
    }

    return (
      <div>
        <GridList
          style={styles.gridList}
          children={4}
          cols={this.props.width === SMALL ? 1 : 2}
          padding={50}
        >
          {this.renderItems(styles)}
        </GridList>
      </div>
    );
  }
}

RecipeCategories.propTypes = {
  types: PropTypes.array,
  isLoading: PropTypes.bool,
  width: PropTypes.number,
};

export default withWidth()(RecipeCategories);
