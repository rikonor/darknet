FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, { content: <App /> });
  }
});

FlowRouter.route('/episodes/:episodeId', {
  action(params, queryParams) {
    ReactLayout.render(MainLayout, { content: <Episode episodeId={params.episodeId}/> });
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
