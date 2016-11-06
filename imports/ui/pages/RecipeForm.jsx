import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class RecipeForm extends Component {

  renderTypeDropDownItems() {
    return this.props.recipeTypes.map(type =>
      <MenuItem
        primaryText={type.name}
        value={type.name}
      />
    );
  }

  renderUomDropDownItems() {
    return this.props.uoms.map(uom =>
      <MenuItem
        primaryText={uom.unit}
        value={uom.unit}
      />
    );
  }

  renderIngredientList(list) {
    return list.map(item =>
      <TableRow key={item.name}>
        <TableRowColumn>
          <TextField
            id="recipe-ingredient-name"
            value={item.name}
          />
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            id="recipe-ingredient-amount"
            value={item.amount}
          />
          <SelectField
            id="recipe-uom"
            value={item.uom}
          >
            {this.renderUomDropDownItems()}
          </SelectField>
        </TableRowColumn>
      </TableRow>
    );
  }

  renderIngredients() {
    return this.props.recipe.ingredients.map((ingredientSet, index) =>
      this.renderIngredientList(ingredientSet.list)
    );
  }

  renderSteps() {
    return this.props.recipe.steps[0].list.map((step, index) =>
      <TextField
        id="recipe-step"
        key={index}
        value={step}
        multiLine
        fullWidth
      />
    );
  }

  render() {
    if (this.props.isLoading) {
      return (<div />);
    }

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
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Ingredients</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {this.renderIngredients()}
          </TableBody>
        </Table>
        <TextField
          id="recipe-serving"
          value={recipe.serves}
        />
        {this.renderSteps()}
      </div>
    );
  }
}

RecipeForm.propTypes = {
  isLoading: PropTypes.bool,
  recipe: PropTypes.object,
  recipeTypes: PropTypes.array,
  uoms: PropTypes.array,
};

RecipeForm.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default RecipeForm;
