var imageStore = new FS.Store.S3("images");

ImagesRaw = new FS.Collection("imagesRaw", {
  stores: [imageStore]
});

Meteor.subscribe("imagesRaw");
