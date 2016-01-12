FlowRouter.route('/', {
  action() {
    FlowRouter.go('/darknet');
  }
});

FlowRouter.route('/darknet', {
  action() {
    GAnalytics.pageview("/");
    ReactLayout.render(HomeLayout, { content: <HomeLoader /> });
  }
});

FlowRouter.route('/darknet/episodes/:episodeName', {
  action(params, queryParams) {
    GAnalytics.pageview(`/episodes/${params.episodeName}`);
    ReactLayout.render(MainLayout, { content: <EpisodeLoader episodeName={params.episodeName}/> });
  }
});

FlowRouter.route('/darknet/about', {
  action() {
    GAnalytics.pageview("/about");
    ReactLayout.render(MainLayout, { content: <About /> });
  }
});

FlowRouter.notFound = {
  action() {
    ReactLayout.render(MainLayout, { content: <NotFound /> });
  }
};

// Admin routes

FlowRouter.route('/darknet/admin', {
  action() {
    ReactLayout.render(MainLayout, { content: <AdminPanel /> });
  }
});

FlowRouter.route('/darknet/sitemap', {
  action() {
    GAnalytics.pageview(`/sitemap`);
    ReactLayout.render(MainLayout, { content: <SiteMap /> });
  }
});
