import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RecipeForm extends Component {

  renderTypeDropDownItems() {
    return this.props.types.map(type =>
      <MenuItem value={type} />
    );
  }

  renderIngredientList(list) {
    return list.map(item =>
      <div>
        <TextField
          id="recipe-ingredient-name"
          value={item.name}
        />
        <TextField
          id="recipe-ingredient-amount"
          value={item.amount}
        />
      </div>
    );
  }

  renderIngredientSet(set) {
    return (
      <div>
        {this.renderIngredientList(set.list)}
      </div>
    );
  }

  renderIngredients() {
    return this.props.recipe.ingredients.map(ingredientSet =>
      this.renderIngredientSet(ingredientSet)
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
        <TextField
          id="recipe-serving"
          value={recipe.serves}
        />
        {this.renderIngredients()}
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
