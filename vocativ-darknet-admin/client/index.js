Template.LoginForm.events({
  "submit .login-form": function(event) {
    event.preventDefault();

    var username = event.target.username.value;
    var password = event.target.password.value;

    Meteor.loginWithPassword(username, password, function(err) {
      if (err) {
        console.log(err);
        return;
      }

      event.target.reset();

      Router.go("/admin");
    });
  }
});
