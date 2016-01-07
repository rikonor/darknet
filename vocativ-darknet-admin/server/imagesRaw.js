var imageStore = new FS.Store.S3("images", {
  bucket: process.env.S3_IMAGES_BUCKET,
  transformWrite: function(fileObj, readStream, writeStream) {
    // Simple bypass transform - prep for GraphicsMagick
    readStream.pipe(writeStream);
  }
});

ImagesRaw = new FS.Collection("imagesRaw", {
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

ImagesRaw.allow({
  insert: function(userId, doc) {
    return isAdmin(userId);
  },
  update: function(userId, doc) {
    return isAdmin(userId);
  },
  remove: function(userId, doc) {
    return isAdmin(userId);
  },
  download: function(userId) {
    return isAdmin(userId);
  }
});
