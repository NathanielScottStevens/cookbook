import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import FramedImage from './FramedImage';
import EditButton from './EditButton';

class RecipeHeader extends Component {
  constructor(props) {
    super(props);
    const { title, serves, slug, type, img } = this.props;

    this.state = {
      servingSelection: 1,
      isEditing: false,
      title,
      serves,
      slug,
      type,
      img,
    };
  }

  onClear() {
    const { title, serves, slug, type } = this.props;
    this.setState({
      isEditing: false,
      title,
      serves,
      slug,
      type,
    });
  }

  onSave() {
    const { title, serves, slug, type } = this.state;
    if (this.props.onChange) {
      this.props.onChange({
        title,
        serves,
        slug,
        type,
      });
    }
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
    const { title, img, isEditingEnabled } = this.props;

    return (
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          {isEditingEnabled &&
            <EditButton
              isEditing={this.state.isEditing}
              onEdit={() => this.setState({ isEditing: true })}
              onClear={() => this.onClear()}
              onSave={() => this.onSave()}
            />
          }
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
    const { title, img, slug, type, serves } = this.state;

    return (
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <EditButton
            isEditing={this.state.isEditing}
            onEdit={() => this.setState({ isEditing: true })}
            onClear={() => this.onClear()}
            onSave={() => this.onSave()}
          />
          <TextField
            id="recipe-title"
            value={title}
            onChange={(_, value) => { this.setState({ title: value }); }}
            floatingLabelText="name"
          />
          <TextField
            id="recipe-serves"
            value={serves}
            onChange={(_, value) => { this.setState({ serves: value }); }}
            floatingLabelText="serves"
          />
          <TextField
            id="recipe-slug"
            value={slug}
            onChange={(_, value) => { this.setState({ slug: value }); }}
            floatingLabelText="slug"
          />
          <SelectField
            id="recipe-type"
            value={type}
            onChange={(_, value) => { this.setState({ type: value }); }}
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

    if (this.state.isEditing) {
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
  isEditingEnabled: PropTypes.bool,
  onChange: PropTypes.func,
};

RecipeHeader.defaultProps = {
  isEditing: false,
};

RecipeHeader.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default RecipeHeader;
