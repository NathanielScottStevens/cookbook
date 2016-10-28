import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import FramedImage from '../components/FramedImage';
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
        key={`${label ? label : 'no-group'}-${index}`}
      >
        <li>{item}</li>
      </ListItem>);
  }

  renderSteps(styles) {
    const steps = this.props.recipe.steps;

    return steps.map(group => {
      let label;
      if (group.label) {
        label = <h3 style={styles.h3}>{group.label}</h3>;
      }

      return (
        <div>
          {label}
            <ol style={styles.ol}>
              {this.renderEachStep(group.list, group.label)}
            </ol>
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

  renderTableRows(list) {
    const serving = this.state.servingSelection + 1;

    return list.map((item, index) => {
      const amount = getMeasurementLabel(item.amt * serving, item.uom);

      return (
        <TableRow key={`${item}-${index}`}>
          <TableRowColumn data-id="ingredient-name">
            {item.name}
          </TableRowColumn>
          <TableRowColumn data-id="ingredient-amount">
            {amount}
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  renderTables(styles) {
    const ingredients = this.props.recipe.ingredients;

    return ingredients.map(group =>
      <div>
        {group.label ? <h3 style={styles.h3}>{group.label}</h3> : ''}
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Ingredients</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {this.renderTableRows(group.list)}
          </TableBody>
        </Table>
        <div style={styles.divider} />
      </div>
    );
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
      h2: {
        fontFamily: this.context.muiTheme.fontFamily,
        textTransform: 'capitalize',
        fontWeight: 500,
      },
      h3: {
        fontFamily: this.context.muiTheme.fontFamily,
        textTransform: 'lowercase',
        marginLeft: this.context.muiTheme.tableRowColumn.spacing,
        fontWeight: 400,
        borderBottom: `${this.context.muiTheme.baseTheme.palette.borderColor} solid 1px`,
      },
      selectField: {
        marginLeft: this.context.muiTheme.tableRowColumn.spacing,
      },
      leftHeader: {
        display: 'flex',
        flexDirection: 'column',
      },
      ol: {
        marginBottom: 60,
      },
      divider: {
        height: 40,
        width: '100%',
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
              style={styles.selectField}
            >
              {this.renderServingItems()}
            </SelectField>
          </div>
          <div style={styles.imgBorder}>
            <FramedImage img={`/../../images/${this.props.recipe.img}`} />
          </div>
        </div>

        {this.renderTables(styles)}
        <div style={styles.divider} />
          <h2 style={styles.h2}>Steps</h2>
            {this.renderSteps(styles)}
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
