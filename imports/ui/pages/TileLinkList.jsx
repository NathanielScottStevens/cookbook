import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth';
import { Link } from 'react-router';
import { GridList, GridTile } from 'material-ui/GridList';
import AppBarNavigation from '../components/AppBarNavigation';


class TileLinkList extends Component {

  renderItems(styles) {
    return this.props.items.map(item =>
      (<Link to={this.props.getLink(item)} key={item.name}>
        <GridTile
          title={item.name}
          style={styles.gridTile}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img style={styles.img} src={`../images/${item.img}`} />
        </GridTile>
      </Link>)
    );
  }

  render() {
    const styles = {
      main: {
        paddingLeft: this.props.width === LARGE ? 256 : 0,
        paddingTop: 30,
        margin: 50,
      },
      gridList: {},
      gridTile: {
        width: 300,
      },
      img: {
        maxWidth: 300,
      },
    };

    if (this.props.isLoading) {
      return (<div />);
    }

    return (
      <div>
        <AppBarNavigation />
        <main style={styles.main}>
          <GridList
            style={styles.gridList}
            children={4}
            cols={this.props.width === SMALL ? 1 : 2}
            padding={50}
          >
            {this.renderItems(styles)}
          </GridList>
        </main>
      </div>
    );
  }
}

TileLinkList.propTypes = {
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getLink: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default withWidth()(TileLinkList);
