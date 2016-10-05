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
