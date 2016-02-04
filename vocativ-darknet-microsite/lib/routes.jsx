if(Meteor.isServer) {
  // Set cache TTL
  var timeInMillis = 1000 * 60; // 60 seconds
  FlowRouter.setPageCacheTimeout(timeInMillis);

  // Instruct FlowRouter SSR to defer script loading (significant load-speed boost)
  // NOTICE: This is turned off at the moment as it causes the loading sequence
  // to be very funky. Feel free to try it again in the future.
  // FlowRouter.setDeferScriptLoading(true);
}

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
