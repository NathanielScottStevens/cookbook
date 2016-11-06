import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import getMeasurementLabel from '../../helpers/measurement';

class IngredientTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = { isEditing: false };
  }

  render() {
    const ingredient = this.props.ingredient;
    const amount = getMeasurementLabel(ingredient.amt * this.props.servingMultiplier, ingredient.uom);

    return (
      <TableRow key={ingredient} striped={this.props.striped}>
        <TableRowColumn data-id="ingredient-name">
          {ingredient.name}
        </TableRowColumn>
        <TableRowColumn data-id="ingredient-amount">
          {amount}
        </TableRowColumn>
      </TableRow>
    );
  }
}

IngredientTableRow.propTypes = {
  ingredient: PropTypes.object.isRequired,
  servingMultiplier: PropTypes.object,
  striped: PropTypes.bool,
};

IngredientTableRow.defaultProps = {
  servingMultiplier: 1,
  striped: false,
};

export default IngredientTableRow;
