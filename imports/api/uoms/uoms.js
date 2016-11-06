import { Mongo } from 'meteor/mongo';

export const Uoms = new Mongo.Collection('uoms');

if (Meteor.isServer) {
  Meteor.publish('uoms', function () {
    return Uoms.find();
  });
}

Meteor.methods({

});
