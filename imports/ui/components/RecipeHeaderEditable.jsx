import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import FramedImage from './FramedImage';
import DoneClearButton from './DoneClearButton';

class RecipeHeaderEditable extends Component {
  constructor(props) {
    super(props);
    const { label, serves, slug, type, img } = this.props;

    this.state = {
      label,
      serves,
      slug,
      type,
      img,
    };
  }

  onDone() {
    const { label, slug, type, img } = this.state;
    const serves = Number(this.state.serves);

    if (this.props.onChange) {
      this.props.onChange({
        label,
        serves,
        slug,
        type,
        img,
      });
    }
  }

  getSelectedType() {
    const recipeTypes = this.props.recipeTypes;
    const type = this.state.type;

    if (type) {
      return recipeTypes.findIndex(t => t.label === type);
    }

    return null;
  }

  typeDropdownOnChange(value) {
    const selection = this.props.recipeTypes[value];
    this.setState({ type: selection.label });
  }

  renderTypeDropDownItems() {
    return this.props.recipeTypes.map((type, index) =>
      <MenuItem
        key={index}
        primaryText={type.label}
        value={index}
      />
    );
  }

  render() {
    const { label, slug, serves } = this.state;

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
      recipeTypeSelect: {
        verticalAlign: 'bottom',
      },
    };

    return (
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <DoneClearButton
            onClear={() => this.props.onClear()}
            onDone={() => this.onDone()}
          />
          <div>
            <TextField
              id="recipe-label"
              value={label}
              onChange={(_, value) => { this.setState({ label: value }); }}
              floatingLabelText="label"
            />
            <TextField
              id="recipe-serves"
              value={serves}
              onChange={(_, value) => { this.setState({ serves: value }); }}
              floatingLabelText="serves"
            />
          </div>
          <div>
            <TextField
              id="recipe-slug"
              value={slug}
              onChange={(_, value) => { this.setState({ slug: value }); }}
              floatingLabelText="slug"
            />
            <SelectField
              id="recipe-type"
              floatingLabelText="type"
              style={styles.recipeTypeSelect}
              value={this.getSelectedType()}
              onChange={(_, v) => { this.typeDropdownOnChange(v); }}
            >
              {this.renderTypeDropDownItems()}
            </SelectField>
          </div>
        </div>
        <FramedImage
          img={`/../../images/${this.props.img}`}
        />
      </div>
    );
  }
}

RecipeHeaderEditable.propTypes = {
  label: PropTypes.string,
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
