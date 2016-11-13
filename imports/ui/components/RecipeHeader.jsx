import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FramedImage from '../components/FramedImage';

class RecipeHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { servingSelection: 1 };
  }

  handleServingChange(event, index, value) {
    this.props.onServingChange(value);
    this.setState({ servingSelection: value });
  }

  renderTypeDropDownItems() {
    return this.props.recipeTypes.map(type =>
      <MenuItem
        primaryText={type.name}
        value={type.name}
      />
    );
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


  renderViewMode(styles) {
    const { title, img } = this.props;

    return (
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <h1 style={styles.h1}>{title}</h1>
          <SelectField
            id="serving-selection"
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

  renderEditMode(styles) {
    const { title, img, slug, type, serves } = this.props;

    return (
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <TextField
            id="recipe-name"
            value={title}
            floatingLabelText="name"
          />
          <TextField
            id="recipe-serves"
            value={serves}
            floatingLabelText="serves"
          />
          <TextField
            id="recipe-slug"
            value={slug}
            floatingLabelText="slug"
          />
          <SelectField
            id="recipe-type"
            value={type}
          >
            {this.renderTypeDropDownItems()}
          </SelectField>
        </div>
        <FramedImage
          img={`/../../images/${img}`}
        />
      </div>
    );
  }

  render() {
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

    if (this.props.isEditing) {
      return this.renderEditMode(styles);
    }

    return this.renderViewMode(styles);
  }
}

RecipeHeader.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  serves: PropTypes.number,
  slug: PropTypes.string,
  type: PropTypes.string,
  recipeTypes: PropTypes.array,
  onServingChange: PropTypes.func,
  isEditing: PropTypes.bool,
};

RecipeHeader.defaultProps = {
  isEditing: false,
};

RecipeHeader.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default RecipeHeader;
