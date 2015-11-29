if (Meteor.isServer) {

  // Bootstrap admin
  if (Meteor.users.find().count() === 0) {
    console.log("Initializing admin");

    Accounts.createUser({
      username: "rikonor",
      email: "rikonor@gmail.com",
      password: "rikonor1234"
    });
  }
}

AdminConfig = {
  name: 'Vocativ DARKnet',
  adminEmails: ['rikonor@gmail.com'],
  collections: {
    Episodes: EpisodesAdminOptions,
    Videos: VideosAdminOptions,
    Articles: ArticlesAdminOptions
  }
};

function isAdmin(userId) {
  let user = Meteor.users.findOne(userId);
  if (! user) return false;
  return user.roles.__global_roles__.indexOf('admin') !== -1;
}

// Override meteor-admin not publishing entities on every page
// This is so when editing an episode, you can attach articles and videos to it

if (Meteor.isServer) {
  Meteor.publish('articles', function() {
    if (! isAdmin(this.userId)) return this.ready();
    return Articles.find();
  });

  Meteor.publish('videos', function() {
    if (! isAdmin(this.userId)) return this.ready();
    return Videos.find();
  });
}

// Set home route for login purposes
Router.route('/', function () {
  this.render('Home');
});
