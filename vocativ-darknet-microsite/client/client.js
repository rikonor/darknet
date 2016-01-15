Meteor.startup(function() {
  /*
    The app only needs to load all data and show it to client
    No need to keep open connection to server or long-poll it for updates
    Once the data is ready, disconnect from the server
  */
  Tracker.autorun(function(c) {
    var subsReady = subsManager.ready();
    if (subsReady) {
      console.log("Data load complete. Disconnecting from Meteor server..");
      c.stop();
      Meteor.disconnect();
    }
  });
});
