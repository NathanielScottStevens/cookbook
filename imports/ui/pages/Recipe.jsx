import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';

import IngredientTable from '../components/IngredientTable';
import Steps from '../components/Steps';
import RecipeHeader from '../components/RecipeHeader';
import AppBarNavigation from '../components/AppBarNavigation';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = { servingMultiplier: 1, isEditing: false };
    this.onServingChange = this.onServingChange.bind(this);
  }

  onServingChange(value) {
    this.setState({ servingMultiplier: value });
  }

  renderSteps() {
    const steps = this.props.recipe.steps;

    return steps.map((group, index) =>
      <Steps
        steps={group.list}
        label={group.label}
        key={`${group.label}-${index}`}
        isEditingEnabled={this.state.isEditing}
      />
    );
  }

  renderTables(styles) {
    const ingredients = this.props.recipe.ingredients;
    const uoms = this.props.uoms;
    const { servingMultiplier, isEditing } = this.state;

    return ingredients.map((group, index) =>
      <div key={`${group.label}-${index}`}>
        <IngredientTable
          ingredients={group.list}
          label={group.label}
          servingMultiplier={servingMultiplier}
          isEditing={isEditing}
          uoms={uoms}
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
    const recipeTypes = this.props.recipeTypes;
    const isEditing = this.state.isEditing;

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
    };

    return (

      <div>
        <AppBarNavigation>
          {isEditing
          ? (
            <div>
              <FlatButton
                data-id="done-button"
                onClick={() => { this.setState({ isEditing: false }); }}
              >
                <Done color="white" />
              </FlatButton>
              <FlatButton
                data-id="clear-button"
                onClick={() => { this.setState({ isEditing: false }); }}
              >
                <Clear color="white" />
              </FlatButton>
            </div>
            )
          : (
            <FlatButton
              data-id="edit-button"
              onClick={() => { this.setState({ isEditing: true }); }}
            >
              <ModeEdit color="white" />
            </FlatButton>
            )
         }
        </AppBarNavigation>
        <main style={styles.main}>
          <RecipeHeader
            title={recipe.name}
            img={recipe.img}
            serves={recipe.serves}
            type={recipe.type}
            recipeTypes={recipeTypes}
            onServingChange={this.onServingChange}
            isEditing={isEditing}
          />
          {this.renderTables(styles)}
          <div style={styles.divider} />
          <h2 style={styles.h2}>Steps</h2>
          {this.renderSteps(styles)}
          <FloatingActionButton style={styles.floatingActionButton}>
            <ContentAdd />
          </FloatingActionButton>
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
