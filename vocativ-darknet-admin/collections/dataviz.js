DataViz = new Meteor.Collection("dataviz");

Schemas.DataViz = new SimpleSchema({
  createdAt: Schemas.createdAt,
  title: Schemas.title("Data Visualization Title"),
  description: Schemas.description("Data Visualization Description"),
  image: Schemas.image("DataViz Image")
});

DataViz.attachSchema(Schemas.DataViz);

// Admin Panel options

DataVizAdminOptions = {
  icon: 'bar-chart',
  tableColumns: [
    { label: 'Title', name: 'title' }
  ],
  routes: adminRoutesWaitOnOptions(['images']),
  showInSideBar: false,
  showWidget: false
};
