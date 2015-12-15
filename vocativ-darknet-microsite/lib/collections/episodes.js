Episodes = new Meteor.Collection("episodes");

if (Meteor.isServer) {
  Meteor.publish("episodes", function() {
    return Episodes.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("episodes");
}

Episodes.helpers({
  imageUrl: function() {
    var imageId = this.image;
    var image = Images.findOne(imageId);

    return image.url();
  },
  hasAired: function() {
    return this.airingAt <= (new Date());
  }
});
