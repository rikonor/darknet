Videos = new Meteor.Collection("videos");

if (Meteor.isServer) {
  Meteor.publish("videos", function() {
    return Videos.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("videos");
}
