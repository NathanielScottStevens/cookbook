import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import getMeasurementLabel from '../../helpers/measurement';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = { servingSelection: 0 };
  }

  renderTableRows() {
    const serving = this.state.servingSelection + 1;
    return this.props.recipe.ingredients.map((ingredient, index) => {
      let amount = getMeasurementLabel(ingredient.amt * serving, ingredient.uom);

      return (
        <TableRow key={index}>
          <TableRowColumn>{ingredient.name}</TableRowColumn>
          <TableRowColumn>
            {amount}
          </TableRowColumn>
        </TableRow>);
    });
  }

  renderSteps() {
    return this.props.recipe.steps.map((step, index) =>
      <ListItem key={index}><li>{step}</li></ListItem>
    );
  }

  renderServingItems() {
    const optionCount = 5;
    let items = [];
    for (let i = 1; i < optionCount; i++) {
      items.push(this.props.recipe.serves * i);
    }

    return items.map((item, index) =>
      <MenuItem key={item} value={index} label={item} primaryText={item} />
    );
  }

  handleServingChange(event, index, value) {
    this.setState({ servingSelection: value });
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
            <SelectField
              value={this.state.servingSelection}
              onChange={(event, index, value) => this.handleServingChange(event, index, value)}
            >
              {this.renderServingItems()}
            </SelectField>
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
