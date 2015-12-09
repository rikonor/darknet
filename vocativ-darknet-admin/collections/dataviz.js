DataViz = new Meteor.Collection("dataviz");

Schemas.DataViz = new SimpleSchema({
  createdAt: Schemas.createdAt,
  name: {
    type: String,
    max: 60,
    autoform: {
      placeholder: "Data Visualization name"
    }
  },
  image: {
    type: String,
    autoform: {
      type: 'imageGallery'
    }
  },
  views: {
    type: Number,
    autoValue: function () {
      if (this.isInsert) {
        return 0;
      }
    },
    autoform: {
      type: "hidden"
    }
  }
});

DataViz.attachSchema(Schemas.DataViz);

// Admin Panel options

DataVizAdminOptions = {
  icon: 'bar-chart',
  tableColumns: [
    { label: 'Name', name: 'name' },
    { label: 'Views', name: 'views' }
  ],
  routes: adminRoutesWaitOnOptions(['images'])
};
