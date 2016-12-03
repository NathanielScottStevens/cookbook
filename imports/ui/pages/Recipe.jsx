import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import IngredientTable from '../components/IngredientTable';
import StepsGroup from '../components/StepsGroup';
import RecipeHeader from '../components/RecipeHeader';
import AppBarNavigation from '../components/AppBarNavigation';
import EditButton from '../components/EditButton';
import RecipeHeaderEditable from '../components/RecipeHeaderEditable';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      servingMultiplier: 1,
      isEditingHeader: false,
    };

    this.onServingChange = this.onServingChange.bind(this);
  }

  onServingChange(value) {
    this.setState({ servingMultiplier: value });
  }

  onHeaderChange(value) {
    this.setState({ isEditingHeader: false });
  }

  onStepsChange(index, value) {

  }

  renderSteps() {
    return this.props.recipe.steps.map(steps =>
      <StepsGroup
        steps={steps}
        onChange={(index, value) =>
          this.onStepsChange(index, value)
        }
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
        <AppBarNavigation />
        <main style={styles.main}>
          {this.state.isEditingHeader
            ? <RecipeHeaderEditable
                title={recipe.label}
                img={recipe.img}
                serves={recipe.serves}
                slug={recipe.slug}
                type={recipe.type}
                recipeTypes={recipeTypes}
                onChange={(v) => { this.onHeaderChange(v); }}
                onClear={() => {
                  this.setState({ isEditingHeader: false });
                }}
              />
            : <div>
                <EditButton
                  data-id="header-edit"
                  onClick={() => {
                    this.setState({ isEditingHeader: true });
                  }}
                />
                <RecipeHeader
                  title={recipe.label}
                  img={recipe.img}
                  serves={recipe.serves}
                  onServingChange={this.onServingChange}
                />
              </div>
          }
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
