Articles = new Meteor.Collection("articles");

if (Meteor.isServer) {
  Meteor.publish("articles", function() {
    return Articles.find();
  });
}

if (Meteor.isClient) {
  subsManager.subscribe("articles");
}

Articles.helpers({
  imageUrl: function() {
    var imageId = this.image;
    var image = Images.findOne(imageId);

    return image.url();
  }
});
