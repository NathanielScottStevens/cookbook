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

const ingredientItemSchema = new SimpleSchema({
  label: { type: String },
  amt: { type: Number },
  uom: { type: String, optional: true },
});

export const ingredientsSchema = new SimpleSchema({
  label: { type: String, optional: true },
  list: { type: [ingredientItemSchema] },
});

export const headerSchema = new SimpleSchema({
  label: { type: String },
  type: { type: String },
  img: { type: String, regEx: /^\S*$/ },
  slug: { type: String, regEx: /^\S*$/ },
  serves: { type: Number },
});

export const stepsSchema = new SimpleSchema({
  label: { type: String, optional: true },
  list: { type: [String] },
});

export const recipeSchema = new SimpleSchema([
  { _id: { type: String } },
  headerSchema,
  {
    ingredients: { type: [ingredientsSchema] },
    steps: { type: [stepsSchema] },
  },
]);

export const updateRecipe = new ValidatedMethod({
  name: 'updateRecipe',
  validate: recipeSchema.validator(),
  run({ _id, ...recipe }) {
    Recipes.update(_id, recipe);
  },
});

export const insertRecipe = new ValidatedMethod({
  name: 'insertRecipe',
  validate: recipeSchema.validator(),
  run({ ...recipe }) {
    return Recipes.insert(recipe);
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
