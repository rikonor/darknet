/*
  Pages

  // Consider doing a Layout component with a content prop
  // The layout will have a navbar and footer
  // then you just render the layout and set the content

  1. Home page
  2. About page
  3. Episode page
*/

FlowRouter.route('/', {
  action() {
    console.log("home page");
    ReactLayout.render(MainLayout, { content: <App /> });
  }
});

FlowRouter.route('/episodes/:episodeId', {
  action(params, queryParams) {
    console.log("episode page");
    ReactLayout.render(MainLayout, { content: <Episode episodeId={params.episodeId}/> });
  }
});

FlowRouter.route('/about', {
  action() {
    console.log("about page");
    ReactLayout.render(MainLayout, { content: <About /> });
  }
});

FlowRouter.notFound = {
  action() {
    console.log("not found page");
    ReactLayout.render(MainLayout, { content: <NotFound /> });
  }
};
