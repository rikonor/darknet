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
