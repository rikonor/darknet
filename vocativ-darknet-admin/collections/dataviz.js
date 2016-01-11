DataViz = new Meteor.Collection("dataviz");

Schemas.DataViz = new SimpleSchema({
  createdAt: Schemas.createdAt,
  title: {
    type: String,
    max: 200,
    label: "Visible Description",
    autoform: {
      placeholder: "Visible Description"
    }
  },
  image: Schemas.image("DataViz Image"),
  relatedEpisode: Schemas.relatedEpisode
});

DataViz.attachSchema(Schemas.DataViz);

// Admin Panel options

DataVizAdminOptions = {
  icon: 'bar-chart',
  tableColumns: [
    { label: 'Visible Description', name: 'title' },
    { label: 'Related to', name: 'relatedEpisode' }
  ],
  routes: adminRoutesWaitOnOptions([
    'episodes',
    'images'
  ]),
  showInSideBar: false,
  showWidget: false
};
