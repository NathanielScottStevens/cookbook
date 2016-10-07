import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { List, ListItem } from 'material-ui/List';


class Recipe extends Component {
  constructor(props) {
    super(props);
  }

  formatUom(uom, amt) {
    if (uom) {
      return amt > 1 ? `${uom}s` : uom;
    }
    return '';
  }

  renderTableRows() {
    return this.props.recipe.ingredients.map(ingredient =>
      <TableRow>
        <TableRowColumn>{ingredient.name}</TableRowColumn>
        <TableRowColumn>
          {ingredient.amt} {this.formatUom(ingredient.uom, ingredient.amt)}
        </TableRowColumn>
      </TableRow>
    );
  }

  renderSteps() {
    return this.props.recipe.steps.map(step =>
      <ListItem><li>{step}</li></ListItem>
    );
  }

  render() {
    if (this.props.isLoading) {
      return (<div>Loading...</div>);
    }

    const styles = {

    };

    return (
      <div style={styles.root}>
        <h1>{ this.props.recipe.name }</h1>
        <img src={`/../../images/${this.props.recipe.img}`} />
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Ingredients</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {this.renderTableRows()}
          </TableBody>
        </Table>
        <List>
          <h2>Steps</h2>
          <ol>
            {this.renderSteps()}
          </ol>
        </List>
      </div>
    );
  }
}

Recipe.propTypes = {
  isLoading: PropTypes.bool,
  recipe: PropTypes.object,
};

export default Recipe;
