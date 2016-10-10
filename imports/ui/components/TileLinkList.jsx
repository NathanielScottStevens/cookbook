import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL } from 'material-ui/utils/withWidth';
import { Link } from 'react-router';
import { Motion, spring } from 'react-motion';

import { GridList, GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

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
      gridList: {},
      gridTile: {
        width: 300,
        boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
      },
      img: {
        maxWidth: 300,
      }
    };

    if (this.props.isLoading) {
      return (<div />);
    }

    return (
      <Motion defaultStyle={{right: -500 }} style={{right: spring(0)}} >
      { interpolatedStyle => (
        <div>
          <GridList
            style={{position: 'absolute', ...styles.gridList, ...interpolatedStyle}}
            children={4}
            cols={this.props.width === SMALL ? 1 : 2}
            padding={50}
          >
            {this.renderItems(styles)}
          </GridList>
        </div>
      )}
      </Motion>
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
