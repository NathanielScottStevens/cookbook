import { Meteor } from 'meteor/meteor';

import { Recipes } from '../../api/recipes/recipes';
import recipeSample from '../../api/recipes/fixture';

import { RecipeTypes } from '../../api/recipeTypes/recipeTypes';
import recipeTypes from '../../api/recipeTypes/fixture';


function setRecipes() {
  if (Recipes.find().count() === 0) {
    recipeSample.forEach(recipe => {
      Recipes.insert(recipe);
    });
  }

  if (RecipeTypes.find().count() === 0) {
    recipeTypes.forEach(recipeType => {
      RecipeTypes.insert(recipeType);
    });
  }
}

Meteor.startup(() => {
  setRecipes();
});
