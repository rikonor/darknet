FlowRouter.route('/', {
  name: 'Home',
  action() {
    GAnalytics.pageview('/');
    DocHead.setTitle('Vocativ - DARK NET');
    ReactLayout.render(HomeLayout, { content: <HomeLoader /> });
  }
});

FlowRouter.route('/episodes/:episodeName', {
  name: 'Episode',
  action(params, queryParams) {
    GAnalytics.pageview(`/episodes/${params.episodeName}`);
    DocHead.setTitle(`Vocativ - DARK NET - ${params.episodeName}`);
    ReactLayout.render(MainLayout, { content: <EpisodeLoader episodeName={params.episodeName}/> });
  }
});

FlowRouter.notFound = {
  name: 'NotFound',
  action() {
    ReactLayout.render(MainLayout, { content: <NotFound /> });
  }
};

FlowRouter.route('/admin', {
  name: 'Admin',
  action() {
    ReactLayout.render(MainLayout, { content: <AdminPanel /> });
  }
});

FlowRouter.route('/sitemap', {
  name: 'SiteMap',
  action() {
    GAnalytics.pageview(`/sitemap`);
    ReactLayout.render(MainLayout, { content: <SiteMap /> });
  }
});

FlowRouter.route('/press', {
  name: 'Press',
  action() {
    GAnalytics.pageview('/press');
    ReactLayout.render(MainLayout, { content: <Press /> });
  }
});
