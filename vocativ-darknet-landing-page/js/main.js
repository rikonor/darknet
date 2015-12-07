function trackClick(target) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'DarkNet',
    eventAction: 'Click',
    eventLabel: target,
    eventValue: 1
  });
}

function trackSignup() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'DarkNet',
    eventAction: 'Signup',
    eventLabel: 'Vocativ Newsletter',
    eventValue: 1
  });
}

// showtime
$(".vocativ-link").click(function() {
  trackClick('Vocativ Link');
});

// vocativ
$(".showtime-link").click(function() {
  trackClick('Showtime Link');
});

$(".facebook-link").click(function() {
  trackClick('Facebook Link');
});

$(".twitter-link").click(function() {
  trackClick('Twitter Link');
});

var signupForm = $(".signup-form form");
var thankYouNote = $(".thank-you-invite");
var inviteText = $(".invite-text");

signupForm.submit(function(e) {
  trackSignup();

  // Clear the form (wait a sec for the form to submit)
  setTimeout(function() {
    signupForm[0].reset();
  }, 1000);

  // Hide the form and show the thank you note instead
  signupForm.parent().hide();
  inviteText.hide();
  thankYouNote.removeClass("hidden");
});
