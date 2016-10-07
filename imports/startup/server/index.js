import { Meteor } from 'meteor/meteor';

import { Recipes } from '../../api/recipes/recipes';
import recipeSample from '../../api/recipes/fixture';


function setRecipes() {
  if (Recipes.find().count() === 0) {
    recipeSample.forEach(recipe => {
      Recipes.insert(recipe);
    });
  }
}

Meteor.startup(() => {
  setRecipes();
});
