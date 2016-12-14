import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import getMeasurementLabel from '../../helpers/measurement';

const IngredientTableRow = ({ ingredient, servingMultiplier, striped }) => {
  const amountFormatted = getMeasurementLabel(
    ingredient.amt * servingMultiplier,
    ingredient.uom
  );

  return (
    <TableRow
      key={ingredient}
      striped={striped}
    >
      <TableRowColumn data-id="ingredient-label">
        {ingredient.label}
      </TableRowColumn>
      <TableRowColumn data-id="ingredient-amount">
        {amountFormatted}
      </TableRowColumn>
    </TableRow>
  );
};

IngredientTableRow.propTypes = {
  ingredient: PropTypes.object.isRequired,
  servingMultiplier: PropTypes.number,
  striped: PropTypes.bool,
};

IngredientTableRow.defaultProps = {
  servingMultiplier: 1,
  striped: false,
};

IngredientTableRow.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default IngredientTableRow;
