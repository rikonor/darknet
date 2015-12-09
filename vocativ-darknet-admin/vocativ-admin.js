AdminConfig = {
  name: 'Vocativ DARKnet',
  adminEmails: ['rikonor@gmail.com'],
  collections: {
    Episodes: EpisodesAdminOptions,
    Videos: VideosAdminOptions,
    Articles: ArticlesAdminOptions,
    DataViz: DataVizAdminOptions,
    Images: ImagesAdminOptions
  }
};

// Set home route for login purposes
Router.route('/', function () {
  this.render('Home');
});
