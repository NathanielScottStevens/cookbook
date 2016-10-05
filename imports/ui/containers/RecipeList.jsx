import { createContainer } from 'meteor/react-meteor-data';
import RecipeList from '../pages/RecipeList';
import { Recipes } from '../../api/recipes/recipes';

const RecipeSelectionContainer = createContainer(({ params: { id } }) => {
  const recipesHandle = Meteor.subscribe('recipes');
  const isLoading = !recipesHandle.ready();
  const recipes = Recipes.find({ type: id }).fetch();

  return {
    recipes,
    isLoading,
  };
}, RecipeList);

export default RecipeSelectionContainer;
