AdminConfig = {
  name: 'Vocativ DARK NET',
  adminEmails: ['rikonor@gmail.com'],
  collections: {
    Episodes: EpisodesAdminOptions,
    Videos: VideosAdminOptions,
    Articles: ArticlesAdminOptions,
    DataViz: DataVizAdminOptions,
    Images: ImagesAdminOptions
  }
};

AdminDashboard.addSidebarItem('Content Items', {
  icon: 'newspaper-o',
  urls: [
    { title: 'New Video', url: AdminDashboard.path('/videos/new') },
    { title: 'All Videos', url: AdminDashboard.path('/videos') },
    { title: 'New Article', url: AdminDashboard.path('/articles/new') },
    { title: 'All Articles', url: AdminDashboard.path('/articles') },
    { title: 'New DataViz', url: AdminDashboard.path('/dataviz/new') },
    { title: 'All DataViz', url: AdminDashboard.path('/dataviz') },
    { title: 'New Image', url: AdminDashboard.path('/images/new') },
    { title: 'All Images', url: AdminDashboard.path('/images') }
  ]
});

// Set home route for login purposes
Router.route('/', function () {
  this.render('Home');
});
