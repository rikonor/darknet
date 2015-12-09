var imageStore = new FS.Store.S3("images", {
  bucket: "vocativ-darknet-images-bucket"
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
