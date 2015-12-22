trackMap = {
  'vocativ-nav-btn': { category: "Navigation", action: "Top Nav Click", label: "vocativ" },
  'twitter-nav-btn': { category: "Navigation", action: "Top Nav Click", label: "twitter" },
  'facebook-nav-btn': { category: "Navigation", action: "Top Nav Click", label: "facebook" },
  'terms-of-use-footer-btn': { category: "Navigation", action: "Footer Nav Click", label: "terms of use" },
  'privacy-policy-footer-btn': { category: "Navigation", action: "Footer Nav Click", label: "privacy policy" },
  'showtime-home-btn': { category: "Navigation", action: "Top Nav Click", label: "showtime" },
  'newsletter-signup-footer': { category: "Newsletter", action: "Signup", label: "darknet" }
};

// Call GA.event with the associated event data
trackEvent = function(eventKey) {
  var eventData = trackMap[eventKey];

  if (! eventData) {
    console.log(`"${eventKey}" not found in trackMap.`);
    return;
  }

  GAnalytics.event(eventData.category, eventData.action, eventData.label);
};

createEventTracker = function(eventKey) {
  return trackEvent.bind(null, eventKey);
};
