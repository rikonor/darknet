GeneralSettings = new Meteor.Collection("generalSettings");

if (Meteor.isServer) {
  Meteor.publish("generalSettings", function() {
    return GeneralSettings.find();
  });
}

if (Meteor.isClient) {
  subsManager.subscribe("generalSettings");
}
