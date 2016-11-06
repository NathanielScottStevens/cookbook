import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import IngredientTableRow from './IngredientTableRow';

const IngredientTable = ({ ingredients, servingMultiplier }) => {
  const rows = ingredients.map(ingredient =>
    <IngredientTableRow
      ingredient={ingredient}
      servingMultiplier={servingMultiplier}
    />
  );

  return (
    <Table>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Ingredients</TableHeaderColumn>
          <TableHeaderColumn>Amount</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} stripedRows>
        {rows}
      </TableBody>
    </Table>
  );
};

IngredientTable.propTypes = {
  ingredients: PropTypes.array.isRequired,
  servingMultiplier: PropTypes.number,
};

IngredientTable.defaultProps = {
  servingMultiplier: 1,
};

export default IngredientTable;
