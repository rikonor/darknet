Episodes = new Meteor.Collection("episodes");

if (Meteor.isServer) {
  Meteor.publish("episodes", function() {
    return Episodes.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("episodes");
}
