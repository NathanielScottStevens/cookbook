import { Meteor } from 'meteor/meteor';

import { Recipes } from '../../api/recipes/recipes';
import recipeSample from '../../api/recipes/fixture';

import { RecipeTypes } from '../../api/recipeTypes/recipeTypes';
import recipeTypes from '../../api/recipeTypes/fixture';

// import { Menus } from '../../api/menus/menus';
// import { menus } from '../../api/menus/fixture';

import { Uoms } from '../../api/uoms/uoms';
import uoms from '../../api/uoms/fixture';

import { Images } from '../../api/images/images';

Images.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
  download() {
    return true;
  },
});

function setSampleData() {
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

  if (Uoms.find().count() === 0) {
    uoms.forEach(uom => {
      Uoms.insert(uom);
    });
  }

  //
  // if (Menus.find().count() === 0) {
  //   menus.forEach(menu => {
  //     Menus.insert(menu);
  //   });
  // }
}

Meteor.startup(() => {
  setSampleData();
});
