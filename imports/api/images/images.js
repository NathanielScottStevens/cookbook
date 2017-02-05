const imageStore = new FS.Store.GridFS('images');

export const Images = new FS.Collection('images', {
  stores: [imageStore]
});

if (Meteor.isServer) {
  Meteor.publish('images', function () {
    return Images.find();
  });
}

Meteor.methods({

});
