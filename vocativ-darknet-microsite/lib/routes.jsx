FlowRouter.route('/', {
  action() {
    ReactLayout.render(HomeLayout, { content: <Home /> });
  }
});

FlowRouter.route('/episodes/:episodeId', {
  action(params, queryParams) {
    ReactLayout.render(MainLayout, { content: <EpisodeLoader episodeId={params.episodeId}/> });
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