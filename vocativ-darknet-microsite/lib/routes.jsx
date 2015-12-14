FlowRouter.route('/', {
  action() {
    ReactLayout.render(HomeLayout, { content: <HomeLoader /> });
  }
});

FlowRouter.route('/episodes/:episodeName', {
  action(params, queryParams) {
    ReactLayout.render(MainLayout, { content: <EpisodeLoader episodeName={params.episodeName}/> });
  }
});

FlowRouter.route('/about', {
  action() {
    ReactLayout.render(MainLayout, { content: <About /> });
  }
});

FlowRouter.notFound = {
  action() {
    ReactLayout.render(MainLayout, { content: <NotFound /> });
  }
};
