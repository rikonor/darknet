Episodes = new Meteor.Collection("episodes");

// Publish to client
if (Meteor.isServer) {
  Meteor.publish("episodes", function() {
    return Episodes.find();
  });
}

// Client subscribes to whatever he wants to see
if (Meteor.isClient) {
  Meteor.subscribe("episodes");
}
