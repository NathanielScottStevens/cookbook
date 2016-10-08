import { createContainer } from 'meteor/react-meteor-data';
import RecipeCategories from '../pages/RecipeCategories';
import { RecipeTypes } from '../../api/recipeTypes/recipeTypes';

const RecipeCategoriesContainer = createContainer(() => {
  const typesHandle = Meteor.subscribe('recipeTypes');
  const isLoading = !typesHandle.ready();
  const types = RecipeTypes.find({}).fetch();

  return {
    types,
    isLoading,
  };
}, RecipeCategories);

export default RecipeCategoriesContainer;
