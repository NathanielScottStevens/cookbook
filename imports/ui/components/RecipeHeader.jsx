import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FramedImage from '../components/FramedImage';

class RecipeHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { isEditing: false, servingSelection: 1 };
  }

  handleServingChange(event, index, value) {
    this.props.onServingChange(value);
    this.setState({ servingSelection: value });
  }

  renderServingItems() {
    const serves = this.props.serves;
    const optionCount = 10;
    const items = [];
    for (let i = 1; i < optionCount; i++) {
      items.push(serves * i);
    }

    return items.map((item, index) =>
      <MenuItem
        key={index}
        value={index + 1}
        label={`Serves ${item}`}
        primaryText={item}
      />
    );
  }

  render() {
    const { title, img } = this.props;

    const styles = {
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },
      leftHeader: {
        display: 'flex',
        flexDirection: 'column',
      },
      h1: {
        fontFamily: this.context.muiTheme.fontFamily,
        textTransform: 'capitalize',
      },
      selectField: {
        marginLeft: this.context.muiTheme.tableRowColumn.spacing,
      },
    };

    return (
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <h1 style={styles.h1}>{title}</h1>
          <SelectField
            value={this.state.servingSelection}
            onChange={(event, index, value) => this.handleServingChange(event, index, value)}
            style={styles.selectField}
          >
            {this.renderServingItems()}
          </SelectField>
        </div>
        <FramedImage
          img={`/../../images/${img}`}
        />
      </div>
    );
  }
}

RecipeHeader.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  serves: PropTypes.number,
  onServingChange: PropTypes.func,
};

RecipeHeader.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default RecipeHeader;
