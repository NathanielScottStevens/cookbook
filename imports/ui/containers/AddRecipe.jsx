import { createContainer } from 'meteor/react-meteor-data';
import AddRecipe from '../pages/AddRecipe';
import { Recipes } from '../../api/recipes/recipes';
import { RecipeTypes } from '../../api/recipeTypes/recipeTypes';
import { Images } from '../../api/images/images';

const AddRecipeContainer = createContainer(() => {
  const recipeHandle = Meteor.subscribe('recipes');
  const recipeTypesHandle = Meteor.subscribe('recipeTypes');
  const imagesHandle = Meteor.subscribe('images');

  const isLoading = !recipeHandle.ready() && !recipeTypesHandle.ready() && !imagesHandle.ready();

  const recipes = Recipes.find().fetch();
  const recipeTypes = RecipeTypes.find().fetch();
  const images = Images.find().fetch();

  return {
    recipes,
    recipeTypes,
    images,
    isLoading,
  };
}, AddRecipe);

export default AddRecipeContainer;
