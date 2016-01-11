Videos = new Mongo.Collection("videos");

Schemas.Videos = new SimpleSchema({
  createdAt: Schemas.createdAt,
  youtubeId: {
    type: String,
    label: "YouTube ID",
    autoform: {
      placeholder: "YouTube ID"
    }
  },
  title: {
    type: String,
    max: 200,
    label: "Visible Description",
    autoform: {
      placeholder: "Visible Description"
    }
  },
  image: Schemas.image("Video Cover Image"),
  relatedEpisode: Schemas.relatedEpisode
});

Videos.attachSchema(Schemas.Videos);

// Admin Panel options
VideosAdminOptions = {
  icon: 'video-camera',
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
