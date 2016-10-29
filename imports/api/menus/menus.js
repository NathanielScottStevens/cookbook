import { Mongo } from 'meteor/mongo';
import { Recipes } from '../recipes/recipes';

export const Menus = new Mongo.Collection('menus');

Menus.helpers({
  // Helpers are at the document level.
});

if (Meteor.isServer) {
  Meteor.publish('menus', function () {
    return Menus.find();
  });
}

Meteor.methods({

});

Factory.define('menu', Menus, {
  title: Fake.word(),
  date: new Date(),
  items: [
    Factory.create('simpleRecipe', { type: 'salad' }),
    Factory.create('complexRecipe', { type: 'entree' }),
    Factory.create('simpleRecipe', { type: 'side' }),
    Factory.create('simpleRecipe', { type: 'dessert' }),
  ],
});
