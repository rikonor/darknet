function trackClick(target) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'DarkNet',
    eventAction: 'Click',
    eventLabel: target
  });
}

$(".facebook-link").click(function() {
  trackClick('Facebook Link');
});

$(".twitter-link").click(function() {
  trackClick('Twitter Link');
});
