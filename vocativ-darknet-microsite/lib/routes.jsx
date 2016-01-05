FlowRouter.route('/', {
  action() {
    GAnalytics.pageview("/");
    ReactLayout.render(HomeLayout, { content: <HomeLoader /> });
  }
});

FlowRouter.route('/episodes/:episodeName', {
  action(params, queryParams) {
    GAnalytics.pageview(`/episodes/${params.episodeName}`);
    ReactLayout.render(MainLayout, { content: <EpisodeLoader episodeName={params.episodeName}/> });
  }
});

FlowRouter.route('/about', {
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

FlowRouter.route('/admin', {
  action() {
    ReactLayout.render(MainLayout, { content: <AdminPanel /> });
  }
});
