DataViz = new Meteor.Collection("dataviz");

if (Meteor.isServer) {
  Meteor.publish("dataviz", function() {
    return DataViz.find();
  });
}

if (Meteor.isClient) {
  subsManager.subscribe("dataviz");
}

DataViz.helpers({
  imageUrl: function() {
    var imageId = this.image;
    var image = Images.findOne(imageId);

    return image.url();
  }
});
