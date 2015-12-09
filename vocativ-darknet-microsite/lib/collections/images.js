Images = new Meteor.Collection("images");

if (Meteor.isServer) {
  Meteor.publish("images", function() {
    return Images.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("images");
}

Images.helpers({
  url: function() {
    // Get the actual image url from the rawImage
    // (We need this because Images is a wrapper of ImagesRaw)

    var rawImageId = this.image;
    var rawImage = ImagesRaw.findOne(rawImageId);

    return rawImage.url();
  }
});
