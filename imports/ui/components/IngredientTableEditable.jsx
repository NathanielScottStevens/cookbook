import React, { PropTypes, Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import IngredientTableRowEditable from './IngredientTableRowEditable';
import DoneClearButton from './DoneClearButton';

class IngredientTableEditable extends Component {
  constructor(props) {
    super(props);

    const ingredients = this.copyIngredients(props.ingredients);

    this.state = {
      label: props.label,
      ingredients,
    };
  }

  onDone() {
    const onChange = this.props.onChange;
    if (onChange) {
      const { label, ingredients } = this.state;
      onChange(label, ingredients);
    }
  }

  onClear() {
    this.setState({
      label: this.props.label,
      ingredients: this.copyIngredients(this.props.ingredients),
    });
  }

  onLabelChange(value) {
    this.setState({ label: value });
  }

  onIngredientChange(value, index) {
    const ingredients = this.copyIngredients(this.state.ingredients);
    ingredients[index] = value;
    this.setState({ ingredients });
  }

  copyIngredients(ingredients) {
    const copy = [];
    ingredients.forEach(ingredient =>
      copy.push({
        label: ingredient.label,
        amt: ingredient.amt,
        uom: ingredient.uom,
      })
    );

    return copy;
  }

  render() {
    const uoms = this.props.uoms;
    const { label, ingredients } = this.state;

    return (
      <div>
        <DoneClearButton
          onDone={() => this.onDone()}
          onClear={() => this.onClear()}
        />
        <TextField
          id="ingredient-label"
          value={label}
          onChange={(_, v) =>
           this.onLabelChange(v)
          }
        />
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Ingredients</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {ingredients.map((ingredient, index) =>
              <IngredientTableRowEditable
                ingredient={ingredient}
                key={index}
                uoms={uoms}
                onChange={(v) => {
                  this.onIngredientChange(v, index);
                }}
              />
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

IngredientTableEditable.propTypes = {
  ingredients: PropTypes.array.isRequired,
  label: PropTypes.string,
  uoms: PropTypes.array,
  onChange: PropTypes.func,
};

IngredientTableEditable.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default IngredientTableEditable;
