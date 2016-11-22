import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import FramedImage from './FramedImage';
import DoneClearButton from './DoneClearButton';

class RecipeHeaderEditable extends Component {
  constructor(props) {
    super(props);
    const { title, serves, slug, type } = this.props;

    this.state = {
      title,
      serves,
      slug,
      type,
    };
  }

  onDone() {
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

  getSelectedType() {
    const recipeTypes = this.props.recipeTypes;
    const type = this.state.type;
    return recipeTypes.findIndex(t => t.name === type);
  }

  typeDropdownOnChange(value) {
    const selection = this.props.recipeTypes[value];
    this.setState({ type: selection.name });
  }

  renderTypeDropDownItems() {
    return this.props.recipeTypes.map((type, index) =>
      <MenuItem
        primaryText={type.name}
        value={index}
      />
    );
  }

  render() {
    const { title, slug, serves } = this.state;

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
    };

    return (
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <DoneClearButton
            onClear={() => this.props.onClear()}
            onDone={() => this.onDone()}
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
            value={this.getSelectedType()}
            onChange={(_, v) => { this.typeDropdownOnChange(v); }}
          >
            {this.renderTypeDropDownItems()}
          </SelectField>
        </div>
        <FramedImage
          img={`/../../images/${this.props.img}`}
        />
      </div>
    );
  }
}

RecipeHeaderEditable.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  serves: PropTypes.number,
  slug: PropTypes.string,
  type: PropTypes.string,
  recipeTypes: PropTypes.array,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
};

RecipeHeaderEditable.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default RecipeHeaderEditable;