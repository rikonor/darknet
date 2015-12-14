Videos = new Mongo.Collection("videos");

Schemas.Videos = new SimpleSchema({
  createdAt: Schemas.createdAt,
  youtubeId: {
    type: String,
    optional: true,
    label: "YouTube ID",
    autoform: {
      placeholder: "YouTube ID"
    }
  },
  name: {
    type: String,
    max: 60,
    autoform: {
      placeholder: "Video name"
    }
  },
  description: {
    type: String,
    max: 300,
    autoform: {
      placeholder: "Video description",
      rows: 5
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

Videos.attachSchema(Schemas.Videos);

// Admin Panel options
VideosAdminOptions = {
  icon: 'video-camera',
  tableColumns: [
    { label: 'Name', name: 'name' },
    { label: 'Views', name: 'views' }
  ],
  routes: adminRoutesWaitOnOptions(['images'])
};
