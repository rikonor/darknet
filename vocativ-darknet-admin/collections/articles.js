Articles = new Meteor.Collection("articles");

Schemas.Articles = new SimpleSchema({
  createdAt: Schemas.createdAt,
  url: Schemas.url("Link to Article"),
  title: Schemas.title("Article Title"),
  description: Schemas.description("Article Description"),
  image: Schemas.image("Article Cover Image")
});

Articles.attachSchema(Schemas.Articles);

// Admin Panel options

ArticlesAdminOptions = {
  icon: 'newspaper-o',
  tableColumns: [
    { label: 'Name', name: 'name' }
  ],
  routes: adminRoutesWaitOnOptions(['images'])
};
