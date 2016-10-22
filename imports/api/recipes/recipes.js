import { Mongo } from 'meteor/mongo';

export const Recipes = new Mongo.Collection('recipes');

Recipes.helpers({
  // Helpers are at the document level.
});

if (Meteor.isServer) {
  Meteor.publish('recipes', function () {
    return Recipes.find();
  });
}

Meteor.methods({

});

function fakeIngredients() {
  const ingredients = [];

  for (let i = 0; i < 5; i++) {
    ingredients.push({
      name: Fake.word(),
      amt: 3,
      uom: Fake.fromArray([null, 'oz', 'pnt']),
    });
  }

  return ingredients;
}

function fakeSteps() {
  const steps = [];

  for (let i = 0; i < 8; i++) {
    steps.push(Fake.sentence());
  }

  return steps;
}

Factory.define('recipe', Recipes, {});

Factory.define('recipes', Recipes, {
  name: Fake.word(),
  type: Fake.fromArray(['salad', 'entree', 'side', 'dessert']),
  img: 'image.png',
  slug: Fake.word(),
  serves: 24,
  ingredients: fakeIngredients(),
  steps: fakeSteps(),
});
