import { Mongo } from 'meteor/mongo';

export const RecipeTypes = new Mongo.Collection('recipeTypes');

RecipeTypes.helpers({
  // Helpers are at the document level.
});

if (Meteor.isServer) {
  Meteor.publish('recipeTypes', function () {
    return RecipeTypes.find();
  });
}

Meteor.methods({

});

Factory.define('recipeType', RecipeTypes, {
  name: Fake.word(),
  img: `${Fake.word()}.png`,
});

export function getTypesArray() {
  const types = [];

  for (let i = 0; i < 4; i++) {
    const type = Factory.create('recipeType');
    types.push(type);
  }

  return types;
}
