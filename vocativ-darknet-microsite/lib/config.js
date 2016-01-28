// Disable sliding animation when autoScroll brings screen back to top
// Default is 200
// RouterAutoscroll.animationDuration = 100;

// Setup FlowRouter SSR Caching
if (Meteor.isServer) {
  var timeInMillis = 1000 * 60; // 60 secs
  FlowRouter.setPageCacheTimeout(timeInMillis);
  // FlowRouter.setDeferScriptLoading(true);
}

// Create a subscription manager (for caching purposes)
subsManager = new SubsManager();
