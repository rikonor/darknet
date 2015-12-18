Videos = new Meteor.Collection("videos");

if (Meteor.isServer) {
  Meteor.publish("videos", function() {
    return Videos.find();
  });
}

if (Meteor.isClient) {
  subsManager.subscribe("videos");
}

Videos.helpers({
  imageUrl: function() {
    var imageId = this.image;
    var image = Images.findOne(imageId);

    return image.url();
  }
});
