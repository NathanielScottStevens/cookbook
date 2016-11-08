import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL } from 'material-ui/utils/withWidth';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IngredientTable from '../components/IngredientTable';
import Steps from '../components/Steps';
import RecipeHeader from '../components/RecipeHeader';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = { servingMultiplier: 1 };
    this.onServingChange = this.onServingChange.bind(this);
  }

  onServingChange(value) {
    this.setState({ servingMultiplier: value });
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

  renderTables(styles) {
    const ingredients = this.props.recipe.ingredients;

    return ingredients.map(group =>
      <div>
        <IngredientTable
          ingredients={group.list}
          label={group.label}
          servingMultiplier={this.state.servingMultiplier}
        />
        <div style={styles.divider} />
      </div>
    );
  }

  render() {
    if (this.props.isLoading) {
      return (<div />);
    }

    const recipe = this.props.recipe;

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
        <RecipeHeader
          title={recipe.name}
          img={recipe.img}
          serves={recipe.serves}
          onServingChange={this.onServingChange}
        />
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
