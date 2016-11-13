import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import getMeasurementLabel from '../../helpers/measurement';

class IngredientTableRow extends Component {
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
    const amountFormatted = getMeasurementLabel(
      ingredient.amt * this.props.servingMultiplier,
      ingredient.uom
    );
    const isEditing = this.props.isEditing;

    return (
      <TableRow
        key={ingredient}
        striped={this.props.striped}
      >
        <TableRowColumn data-id="ingredient-name">
          {isEditing
            ?
              <TextField
                id="ingredient-name"
                value={ingredient.name}
              />
            : ingredient.name
          }
        </TableRowColumn>
        <TableRowColumn data-id="ingredient-amount">
          {isEditing
            ?
              <TextField
                id="ingredient-amount"
                value={ingredient.amt}
              />
            : amountFormatted
          }
        </TableRowColumn>
        {isEditing &&
          <TableRowColumn data-id="ingredient-uom">
            <SelectField
              id="recipe-uom"
              value={ingredient.uom}
            >
              {this.renderUomDropDownItems()}
            </SelectField>
          </TableRowColumn>
        }
      </TableRow>
    );
  }
}

IngredientTableRow.propTypes = {
  ingredient: PropTypes.object.isRequired,
  servingMultiplier: PropTypes.number,
  striped: PropTypes.bool,
  isEditing: PropTypes.bool,
  uoms: PropTypes.array,
};

IngredientTableRow.defaultProps = {
  servingMultiplier: 1,
  striped: false,
  isEditing: true,
};

IngredientTableRow.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default IngredientTableRow;
