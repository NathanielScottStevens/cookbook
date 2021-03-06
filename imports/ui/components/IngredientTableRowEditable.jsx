import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class IngredientTableRowEditable extends Component {
  onChange(values) {
    const { ingredient, onChange } = this.props;

    if (onChange) {
      const newValues = Object.assign({}, ingredient, values);
      newValues.amt = Number(newValues.amt);
      onChange(newValues);
    }
  }

  onUomChange(value) {
    this.onChange({ uom: this.props.uoms[value].unit });
  }

  renderUomDropDownItems() {
    return this.props.uoms.map(uom =>
      <MenuItem
        primaryText={uom.unit}
        value={uom.unit}
      />
    );
  }

  render() {
    const ingredient = this.props.ingredient;
    const styles = {
      ingredientLabel: {
        width: '100%',
      },
    };

    return (
      <TableRow
        key={ingredient}
        striped={this.props.striped}
      >
        <TableRowColumn colSpan={2}>
          <TextField
            id="ingredient-label"
            value={ingredient.label}
            style={styles.ingredientLabel}
            onChange={(_, v) =>
             this.onChange({ label: v })
            }
          />
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            id="ingredient-amount"
            value={ingredient.amt}
            onChange={(_, v) =>
             this.onChange({ amt: v })
            }
          />
        </TableRowColumn>
        <TableRowColumn>
          <SelectField
            id="ingredient-uom"
            value={ingredient.uom}
            onChange={(_, v) =>
             this.onUomChange(v)
            }
          >
            {this.renderUomDropDownItems()}
          </SelectField>
        </TableRowColumn>
      </TableRow>
    );
  }
}

IngredientTableRowEditable.propTypes = {
  ingredient: PropTypes.object.isRequired,
  striped: PropTypes.bool,
  uoms: PropTypes.array,
  onChange: PropTypes.func,
};

IngredientTableRowEditable.defaultProps = {
  servingMultiplier: 1,
  striped: false,
};

IngredientTableRowEditable.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default IngredientTableRowEditable;
