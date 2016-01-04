GeneralSettings = new Meteor.Collection("generalSettings");

Schemas.GeneralSettings = new SimpleSchema({
  updatedAt: Schemas.updatedAt,
  trailerId: {
    type: String,
    optional: true,
    label: "Trailer",
    autoform: {
      type: "select2",
      options: function() {
        return _.map(Videos.find().fetch(), (video) => {
          return {
            label: video.title,
            value: video._id
          };
        });
      }
    }
  }
});

GeneralSettings.attachSchema(Schemas.GeneralSettings);

// Admin Panel options

GeneralSettingsAdminOptions = {
  label: 'Home Page Trailer',
  icon: 'bar-chart',
  tableColumns: [
    { label: 'Last Updated', name: 'updatedAt' }
  ],
  routes: adminRoutesWaitOnOptions([
    'videos'
  ])
};
