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
  title: Schemas.title("Video Title"),
  description: Schemas.description("Video Description"),
  image: Schemas.image("Video Cover Image"),
  relatedEpisodeId: Schemas.relatedEpisodeId
});

Videos.attachSchema(Schemas.Videos);

// Admin Panel options
VideosAdminOptions = {
  icon: 'video-camera',
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
