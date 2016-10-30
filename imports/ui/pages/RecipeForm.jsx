import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
  }

  renderTypeDropDownItems() {
    return this.props.types.map(type =>
      <MenuItem value={type} />
    );
  }

  render() {
    const recipe = this.props.recipe;

    return (
      <div>
        <TextField
          id="recipe-name"
          value={recipe.name}
        />
        <TextField
          id="recipe-slug"
          value={recipe.slug}
        />
        <SelectField
          id="recipe-type"
          value={recipe.type}
        >
          {this.renderTypeDropDownItems()}
        </SelectField>
      </div>
    );
  }
}

RecipeForm.propTypes = {
  isLoading: PropTypes.bool,
  recipe: PropTypes.object,
  types: PropTypes.array,
};

RecipeForm.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default RecipeForm;
