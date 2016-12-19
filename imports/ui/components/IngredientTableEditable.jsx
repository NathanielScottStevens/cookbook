import React, { PropTypes, Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRowColumn, TableRow } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import IngredientTableRowEditable from './IngredientTableRowEditable';
import DoneClearButton from './DoneClearButton';
import RaisedButton from 'material-ui/RaisedButton';

class IngredientTableEditable extends Component {
  constructor(props) {
    super(props);

    const ingredients = this.copyIngredients(props.ingredients);

    this.state = {
      label: props.label,
      list: ingredients,
    };
  }

  onDone() {
    const onChange = this.props.onChange;
    if (onChange) {
      const { label, list } = this.state;
      onChange({ label, list });
    }
  }

  onClear() {
    this.setState({
      label: this.props.label,
      list: this.copyIngredients(this.props.ingredients),
    });

    if (this.props.onClear) {
      this.props.onClear();
    }
  }

  onLabelChange(value) {
    this.setState({ label: value });
  }

  onIngredientChange(value, index) {
    const list = this.copyIngredients(this.state.list);
    list[index] = value;
    this.setState({ list });
  }

  onAddIngredient() {
    const list = this.copyIngredients(this.state.list);
    list.push({ label: null, amt: null, uom: null });
    this.setState({ list });
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
    const { label, list } = this.state;

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
            {list.map((ingredient, index) =>
              <IngredientTableRowEditable
                ingredient={ingredient}
                key={index}
                uoms={uoms}
                onChange={(v) => {
                  this.onIngredientChange(v, index);
                }}
              />
            )}
            <RaisedButton
              data-id="add-ingredient"
              secondary
              label="+ ingredient"
              onClick={() => { this.onAddIngredient(); }}
            />
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
  onClear: PropTypes.func,
};

IngredientTableEditable.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default IngredientTableEditable;
