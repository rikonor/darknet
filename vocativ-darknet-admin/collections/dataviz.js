DataViz = new Meteor.Collection("dataviz");

Schemas.DataViz = new SimpleSchema({
  createdAt: Schemas.createdAt,
  title: Schemas.title("Data Visualization Title"),
  description: Schemas.description("Data Visualization Description"),
  image: Schemas.image("DataViz Image"),
  relatedEpisodeId: Schemas.relatedEpisodeId
});

DataViz.attachSchema(Schemas.DataViz);

// Admin Panel options

DataVizAdminOptions = {
  icon: 'bar-chart',
  tableColumns: [
    { label: 'Title', name: 'title' },
    { label: 'Related to', name: 'relatedEpisodeId', template: 'episodeLink'}
  ],
  routes: adminRoutesWaitOnOptions([
    'episodes',
    'images'
  ]),
  showInSideBar: false,
  showWidget: false
};
