import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';

import IngredientsGroup from '../components/IngredientsGroup';
import StepsGroup from '../components/StepsGroup';
import RecipeHeader from '../components/RecipeHeader';
import AppBarNavigation from '../components/AppBarNavigation';
import EditButton from '../components/EditButton';
import RecipeHeaderEditable from '../components/RecipeHeaderEditable';
import { updateRecipe } from '../../api/recipes/recipes';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      servingMultiplier: 1,
      isEditingHeader: false,
    };

    this.onServingChange = this.onServingChange.bind(this);
  }

  onAddStep() {

  }

  onServingChange(value) {
    this.setState({ servingMultiplier: value });
  }

  onHeaderChange(value) {
    this.setState({ isEditingHeader: false });
    const toSave = Object.assign({}, this.props.recipe, value);
    updateRecipe.call(toSave);
  }

    return steps.map((group, index) =>
      <Steps
        steps={group.list}
        label={group.label}
        key={`${group.label}-${index}`}
        isEditing={this.state.isEditing}
        onAddStep={this.onAddStep}
      />
    );
  }

  onAddIngredientGroup() {
    const toSave = Object.assign({}, this.props.recipe);
    toSave.ingredients.push({ label: null, list: [] });
    updateRecipe.call(toSave);
  }

  onStepsChange(value) {
    const toSave = Object.assign({}, this.props.recipe, { steps: value });
    updateRecipe.call(toSave);
  }

  onAddStepGroup() {
    const toSave = Object.assign({}, this.props.recipe);
    toSave.steps.push({ label: null, list: [] });
    updateRecipe.call(toSave);
  }

  render() {
    if (this.props.isLoading) {
      return (<div />);
    }

    const recipe = this.props.recipe;
    const recipeTypes = this.props.recipeTypes;

    const styles = {
      main: {
        paddingLeft: this.props.width === LARGE ? 256 : 0,
        paddingTop: 30,
        margin: 50,
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
      divider: {
        height: 40,
        width: '100%',
      },
      floatingActionButton: {
        position: 'fixed',
        bottom: this.props.width === SMALL ? 12 : 48,
        right: this.props.width === SMALL ? 12 : 48,
      },
      editButton: {
        top: 55,
        left: -40,
        minWidth: 33,
      },
    };

    return (
      <div>
        <AppBarNavigation />
        <main style={styles.main}>
          <RecipeHeader
            title={recipe.name}
            img={recipe.img}
            serves={recipe.serves}
            type={recipe.type}
            slug={recipe.slug}
            recipeTypes={recipeTypes}
            onServingChange={this.onServingChange}
            isEditing={isEditing}
          />
          <RaisedButton
            label="+ Ingredient Group"
            data-id="add-ingredient-group"
            secondary
            onClick={() => { this.onAddIngredientGroup(); }}
          />
          <div style={styles.divider} />
          <h2 style={styles.h2}>Steps</h2>
          {this.renderSteps(styles)}
          {!isEditing &&
            <FloatingActionButton style={styles.floatingActionButton}>
              <ContentAdd />
            </FloatingActionButton>
          }
        </main>
      </div>
    );
  }
}

Recipe.propTypes = {
  isLoading: PropTypes.bool,
  recipe: PropTypes.object,
  recipeTypes: PropTypes.array,
  uoms: PropTypes.array,
  width: PropTypes.number.isRequired,
};

Recipe.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default withWidth()(Recipe);
