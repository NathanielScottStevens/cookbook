import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';


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
    return this.props.recipe.ingredients.map((ingredient, index) =>
      <TableRow key={index}>
        <TableRowColumn>{ingredient.name}</TableRowColumn>
        <TableRowColumn>
          {ingredient.amt} {this.formatUom(ingredient.uom, ingredient.amt)}
        </TableRowColumn>
      </TableRow>
    );
  }

  renderSteps() {
    return this.props.recipe.steps.map((step, index) =>
      <ListItem key={index}><li>{step}</li></ListItem>
    );
  }

  render() {
    if (this.props.isLoading) {
      return (<div />)
    }

    const styles = {
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },
      h1: {
        fontFamily: this.context.muiTheme.fontFamily,
        textTransform: 'capitalize',
      },
      leftHeader: {
        display: 'flex',
        flexDirection: 'column',
      },
    };

    return (
      <div>
        <div style={styles.header}>
          <div style={styles.leftHeader}>
            <h1 style={styles.h1}>{ this.props.recipe.name }</h1>
            <TextField
              id="text-field-default"
              floatingLabelText="Serves"
              defaultValue={this.props.recipe.serves}
            />
          </div>
          <img style={styles.img} src={`/../../images/${this.props.recipe.img}`} />
        </div>
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

Recipe.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Recipe;
