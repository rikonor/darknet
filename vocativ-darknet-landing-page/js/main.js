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

var signupForm = $(".signup-form form");
var thankYouNote = $(".thank-you-invite");
var inviteText = $(".invite-text");

signupForm.submit(function() {
  signupForm[0].reset();
  signupForm.parent().hide();
  inviteText.hide();
  thankYouNote.removeClass("hidden");
});
