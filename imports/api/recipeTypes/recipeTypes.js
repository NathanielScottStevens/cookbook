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
