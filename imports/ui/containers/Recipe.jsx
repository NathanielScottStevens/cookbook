import { createContainer } from 'meteor/react-meteor-data';
import Recipe from '../pages/Recipe';
import { Recipes } from '../../api/recipes/recipes';
import { RecipeTypes } from '../../api/recipeTypes/recipeTypes';
import { Uoms } from '../../api/uoms/uoms';

const RecipeContainer = createContainer(({ params: { id } }) => {
  const recipeHandle = Meteor.subscribe('recipes');
  const recipeTypesHandle = Meteor.subscribe('recipeTypes');
  const uomsHandle = Meteor.subscribe('uoms');

  const isLoading = !recipeHandle.ready() && !recipeTypesHandle.ready() && !uomsHandle.ready();

  const recipe = Recipes.findOne({ slug: id });
  const recipeTypes = RecipeTypes.find().fetch();
  const uoms = Uoms.find().fetch();

  return {
    recipe,
    recipeTypes,
    uoms,
    isLoading,
  };
}, Recipe);

export default RecipeContainer;
