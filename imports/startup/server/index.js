import { Meteor } from 'meteor/meteor';

import { Recipes } from '../../api/recipes/recipes';
import recipeSample from '../../api/recipes/fixture';


function setRecipes() {
  Recipes.remove({});
  recipeSample.forEach(recipe => {
    Recipes.insert(recipe);
  });
}

Meteor.startup(() => {
  setRecipes();
});
