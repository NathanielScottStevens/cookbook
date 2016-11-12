import { createContainer } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/recipes';
import TileLinkList from '../pages/TileLinkList';

function getLink(recipe) {
  return `/recipes/${recipe.type}/${recipe.slug}`;
}

const RecipeSelectionContainer = createContainer(({ params: { id } }) => {
  const recipesHandle = Meteor.subscribe('recipes');
  const isLoading = !recipesHandle.ready();
  const recipes = Recipes.find({ type: id }).fetch();

  return {
    items: recipes,
    isLoading,
    getLink,
  };
}, TileLinkList);

export default RecipeSelectionContainer;
