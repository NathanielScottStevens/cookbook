import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import RecipeTypes from '../recipeTypes/recipeTypes';

export const Recipes = new Mongo.Collection('recipes');

Recipes.helpers({
  // Helpers are at the document level.
});

if (Meteor.isServer) {
  Meteor.publish('recipes', function () {
    return Recipes.find();
  });
}

export const recipeSchema = new SimpleSchema({
  _id: { type: String },
  label: { type: String },
  type: { type: String },
  img: { type: String, regEx: /^\S*$/ },
  slug: { type: String, regEx: /^\S*$/ },
  serves: { type: Number },
  ingredients: { type: [Object] },
  'ingredients.$.label': { type: String, optional: true },
  'ingredients.$.list': { type: [Object] },
  'ingredients.$.list.$.label': { type: String },
  'ingredients.$.list.$.amt': { type: Number },
  'ingredients.$.list.$.uom': { type: String, optional: true },
  steps: { type: [Object] },
  'steps.$.label': { type: String, optional: true },
  'steps.$.list': { type: [String] },
});

export const updateRecipe = new ValidatedMethod({
  name: 'recipe',
  validate: recipeSchema.validator(),
  run() {
    const { _id, ...recipe } = this;
    Recipes.update(_id, recipe);
  },
});

export const updateHeader = new ValidatedMethod({
  name: 'recipe.header',
  validate: recipeSchema.validator(),
  run() {
    const { _id, label, type, img, slug, serves } = this;
    Recipes.update(_id, {
      $set: { label, type, img, slug, serves },
    });
  },
});

function fakeIngredients() {
  const ingredients = [];

  for (let i = 0; i < 5; i++) {
    ingredients.push({
      label: Fake.word(),
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

Factory.define('simpleRecipe', Recipes, {
  label: Fake.word(),
  type: Fake.fromArray(['salad', 'entree', 'side', 'dessert']),
  img: 'image.png',
  slug: Fake.word(),
  serves: 24,
  ingredients: [
    {
      label: null,
      list: fakeIngredients(),
    },
  ],
  steps: [
    {
      label: null,
      list: fakeSteps(),
    },
  ],
});

Factory.define('complexRecipe', Recipes, Factory.extend('simpleRecipe', {
  ingredients: [
    {
      label: Fake.word(),
      list: fakeIngredients(),
    },
    {
      label: Fake.word(),
      list: fakeIngredients(),
    },
  ],
  steps: [
    {
      label: Fake.word(),
      list: fakeSteps(),
    },
    {
      label: Fake.word(),
      list: fakeSteps(),
    },
  ],
}));
