FlowRouter.route('/', {
  action() {
    DocHead.setTitle('Vocativ - DARK NET');
    ReactLayout.render(HomeLayout, { content: <HomeLoader /> });
  }
});

FlowRouter.route('/episodes/:episodeName', {
  action(params, queryParams) {
    GAnalytics.pageview(`/episodes/${params.episodeName}`);
    DocHead.setTitle(`Vocativ - DARK NET - ${params.episodeName}`);
    ReactLayout.render(MainLayout, { content: <EpisodeLoader episodeName={params.episodeName}/> });
  }
});

FlowRouter.notFound = {
  action() {
    ReactLayout.render(MainLayout, { content: <NotFound /> });
  }
};

FlowRouter.route('/admin', {
  action() {
    ReactLayout.render(MainLayout, { content: <AdminPanel /> });
  }
});

FlowRouter.route('/sitemap', {
  action() {
    GAnalytics.pageview(`/sitemap`);
    ReactLayout.render(MainLayout, { content: <SiteMap /> });
  }
});

FlowRouter.route('/press', {
  action() {
    GAnalytics.pageview('/press');
    ReactLayout.render(MainLayout, { content: <Press /> });
  }
});
