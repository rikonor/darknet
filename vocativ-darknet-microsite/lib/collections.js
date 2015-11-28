Episodes = new Meteor.Collection("episodes");
Articles = new Meteor.Collection("articles");
Videos = new Meteor.Collection("videos");

// Publish to client
if (Meteor.isServer) {
  Meteor.publish("episodes", function() {
    return Episodes.find();
  });

  Meteor.publish("articles", function() {
    return Articles.find();
  });

  Meteor.publish("videos", function() {
    return Videos.find();
  });
}

// Client subscribes to whatever he wants to see
if (Meteor.isClient) {
  Meteor.subscribe("episodes");
  Meteor.subscribe("articles");
  Meteor.subscribe("videos");
}
