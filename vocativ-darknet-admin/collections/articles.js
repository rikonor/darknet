Articles = new Meteor.Collection("articles");

Schemas.Articles = new SimpleSchema({
  createdAt: Schemas.createdAt,
  url: Schemas.url("Link to Article"),
  title: {
    type: String,
    max: 200,
    label: "Visible Description",
    autoform: {
      placeholder: "Visible Description"
    }
  },
  image: Schemas.image("Article Cover Image"),
  relatedEpisode: Schemas.relatedEpisode
});

Articles.attachSchema(Schemas.Articles);

// Admin Panel options

ArticlesAdminOptions = {
  icon: 'newspaper-o',
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
