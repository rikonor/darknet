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

// Load Testing route
FlowRouter.route('/loaderio-bab6f42f5f859e952303c7af3e056799', {
  action() {
    ReactLayout.render(LoadTest);
  }
});
