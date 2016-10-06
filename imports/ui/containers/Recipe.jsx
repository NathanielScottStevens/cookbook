import { createContainer } from 'meteor/react-meteor-data';
import Recipe from '../pages/Recipe';
import { Recipes } from '../../api/recipes/recipes';

const RecipeContainer = createContainer(({ params: { id } }) => {
  const recipeHandle = Meteor.subscribe('recipes');
  const isLoading = !recipeHandle.ready();
  const recipe = Recipes.findOne(id);

  return {
    recipe,
    isLoading,
  };
}, Recipe);

export default RecipeContainer;
