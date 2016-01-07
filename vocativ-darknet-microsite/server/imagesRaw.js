var imageStore = new FS.Store.S3("images", {
  bucket: process.env.S3_IMAGES_BUCKET
});

ImagesRaw = new FS.Collection("imagesRaw", {
  stores: [imageStore]
});

ImagesRaw.allow({
  download: function() {
    return true;
  }
});

Meteor.publish("imagesRaw", function() {
  return ImagesRaw.find();
});
