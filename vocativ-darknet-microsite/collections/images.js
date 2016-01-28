Images = new Meteor.Collection("images");

if (Meteor.isServer) {
  Meteor.publish("images", function() {
    return Images.find();
  });
}

if (Meteor.isClient) {
  subsManager.subscribe("images");
}

Images.helpers({
  url: function() {
    return this.image;
  }
});
