import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import IngredientTableRow from './IngredientTableRow';

const IngredientTable = ({ ingredients, label, servingMultiplier, uoms, isEditing }, context) => {
  const rows = ingredients.map((ingredient, index) =>
    <IngredientTableRow
      ingredient={ingredient}
      servingMultiplier={servingMultiplier}
      key={index}
      isEditing={isEditing}
      uoms={uoms}
    />
  );

  const styles = {
    h3: {
      fontFamily: context.muiTheme.fontFamily,
      textTransform: 'lowercase',
      marginLeft: context.muiTheme.tableRowColumn.spacing,
      fontWeight: 400,
      borderBottom: `${context.muiTheme.baseTheme.palette.borderColor} solid 1px`,
    },
  };

  return (
    <div>
      {
        label
          ? <h3 style={styles.h3}>{label}</h3>
          : ''
      }
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
    </div>
  );
};

IngredientTable.propTypes = {
  ingredients: PropTypes.array.isRequired,
  label: PropTypes.string,
  servingMultiplier: PropTypes.number,
  uoms: PropTypes.array,
  isEditing: PropTypes.bool,
};

IngredientTable.defaultProps = {
  servingMultiplier: 1,
  isEditing: false,
};

IngredientTable.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default IngredientTable;
