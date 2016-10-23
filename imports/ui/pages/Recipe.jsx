import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import getMeasurementLabel from '../../helpers/measurement';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = { servingSelection: 0 };
  }

  handleServingChange(event, index, value) {
    this.setState({ servingSelection: value });
  }

  renderEachStep(steps, label) {
    return steps.map((item, index) =>
      <ListItem
        key={`${label ?label : 'no-group'}-${index}`}
      >
        <li>{item}</li>
      </ListItem>);
  }

  renderSteps() {
    const steps = this.props.recipe.steps;

    return steps.map(group => {
      let label;
      if (group.label) {
        label = <Subheader inset>{group.label}</Subheader>;
      }

      return (
        <div>
          {label}
          <List>
            <ol>
              {this.renderEachStep(group.list, group.label)}
            </ol>
          </List>
        </div>
      );
    });
  }

  renderServingItems() {
    const optionCount = 10;
    const items = [];
    for (let i = 1; i < optionCount; i++) {
      items.push(this.props.recipe.serves * i);
    }

    return items.map((item, index) =>
      <MenuItem key={item} value={index} label={`Serves ${item}`} primaryText={item} />
    );
  }

  renderTableRows() {
    const serving = this.state.servingSelection + 1;
    const ingredients = this.props.recipe.ingredients;
    const render = [];

    ingredients.forEach(group => {
      if (group.label) {
        render.push(
          <TableRow key={group.label}>
            <TableRowColumn colSpan="3">
              <Subheader inset>{group.label}</Subheader>
            </TableRowColumn>
          </TableRow>
        );
      }

      group.list.forEach((item, index) => {
        const amount = getMeasurementLabel(item.amt * serving, item.uom);

        render.push(
          <TableRow key={`${group.label ? group.label : 'no-group'}-${index}`}>
            <TableRowColumn data-id="ingredient-name">
              {item.name}
            </TableRowColumn>
            <TableRowColumn data-id="ingredient-amount">
              {amount}
            </TableRowColumn>
          </TableRow>
        );
      });
    });

    return render;
  }

  render() {
    if (this.props.isLoading) {
      return (<div />);
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
          <h2>Steps</h2>
            {this.renderSteps()}
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
