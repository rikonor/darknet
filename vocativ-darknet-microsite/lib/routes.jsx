FlowRouter.route('/', {
  action() {
    GAnalytics.pageview("/");
    ReactLayout.render(HomeLayout, { content: <HomeLoader /> });
  }
});

FlowRouter.route('/episodes/:episodeName', {
  action(params, queryParams) {
    GAnalytics.pageview(`/episodes/${params.episodeName}`);

    // Redirect to home page if episode is not released yet
    let episode = Episodes.findOne({title: params.episodeName});
    if (! episode.isViewable()) {
      FlowRouter.redirect("/");
    }

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
