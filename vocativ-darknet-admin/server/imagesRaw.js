Slingshot.createDirective("imageUploads", Slingshot.S3Storage, {
  bucket: process.env.S3_IMAGES_BUCKET,
  acl: "public-read",
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024,
  AWSAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  AWSSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
  },
  key: function (file) {
    return Random.id() + '_' + file.name;
  }
});

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
