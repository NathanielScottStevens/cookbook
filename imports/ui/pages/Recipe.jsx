import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL } from 'material-ui/utils/withWidth';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FramedImage from '../components/FramedImage';
import IngredientTable from '../components/IngredientTable';
import Steps from '../components/Steps';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = { servingSelection: 0 };
  }

  handleServingChange(event, index, value) {
    this.setState({ servingSelection: value });
  }

  renderSteps() {
    const steps = this.props.recipe.steps;

    return steps.map(group =>
      <Steps
        steps={group.list}
        label={group.label}
      />
    );
  }

  renderServingItems() {
    const optionCount = 10;
    const items = [];
    for (let i = 1; i < optionCount; i++) {
      items.push(this.props.recipe.serves * i);
    }

    return items.map((item, index) =>
      <MenuItem key={index} value={index} label={`Serves ${item}`} primaryText={item} />
    );
  }

  renderTables(styles) {
    const ingredients = this.props.recipe.ingredients;

    return ingredients.map(group =>
      <div>
        {group.label ? <h3 style={styles.h3}>{group.label}</h3> : ''}
        <IngredientTable
          ingredients={group.list}
          servingMultiplier={this.state.servingSelection + 1}
        />
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
      divider: {
        height: 40,
        width: '100%',
      },
      floatingActionButton: {
        position: 'fixed',
        bottom: this.props.width === SMALL ? 12 : 48,
        right: this.props.width === SMALL ? 12 : 48,
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
        <FloatingActionButton style={styles.floatingActionButton}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

Recipe.propTypes = {
  isLoading: PropTypes.bool,
  recipe: PropTypes.object,
  width: PropTypes.number.isRequired,
};

Recipe.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default withWidth()(Recipe);
