import { createContainer } from 'meteor/react-meteor-data';
import AddRecipe from '../pages/AddRecipe';
import { Recipes } from '../../api/recipes/recipes';
import { RecipeTypes } from '../../api/recipeTypes/recipeTypes';

const AddRecipeContainer = createContainer(() => {
  const recipeHandle = Meteor.subscribe('recipes');
  const recipeTypesHandle = Meteor.subscribe('recipeTypes');

  const isLoading = !recipeHandle.ready() && !recipeTypesHandle.ready();

  const recipes = Recipes.find().fetch();
  const recipeTypes = RecipeTypes.find().fetch();

  return {
    recipes,
    recipeTypes,
    isLoading,
  };
}, AddRecipe);

export default AddRecipeContainer;
