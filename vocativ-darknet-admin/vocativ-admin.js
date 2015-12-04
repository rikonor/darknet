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

// Data Initialization

if (Meteor.isServer) {
  var noArticles = Articles.find().count() === 0;
  var noVideos = Videos.find().count() === 0;
  var noEpisodes = Episodes.find().count() === 0;

  if (noArticles && noVideos && noEpisodes) {
    console.log("Initializing episodes, articles and videos");

    // Add articles
    var article1 = {
      url: "http://www.vocativ.com/news/254706/vocativ-dark-net-premiere-showtime/",
      name: "Vocativ's \"Dark Net\" To Premiere On Showtime",
      description: "Each half-hour episode of DARK NET will shed light on themes such as bio-hacking, cyber-kidnapping, digital warfare, online cults, pornography addiction, the webcam sex trade and more",
      category: "Media",
      image: "http://media.vocativ.com/photos/2015/11/DarkNetShowtime377232483.jpg"
    };
    var article1Id = Articles.insert(article1);

    var article2 = {
      url: "http://www.vocativ.com/news/255383/dark-net-black-friday/",
      name: "Black Friday Blowout Drug Deals Hit The Dark Net",
      description: "Buyers can get hot deals and steals on drugs to kick off the holiday season",
      category: "Drugs",
      image: "http://media.vocativ.com/photos/2015/11/Weed-Good-Brain707409226.jpg"
    };
    var article2Id = Articles.insert(article2);

    var article3 = {
      url: "http://www.vocativ.com/news/255409/flags-paris-attacks-victims/",
      name: "Blue, White And Red Freckle France As Nation Mourns",
      description: "A ceremony on Friday honored 130 victims of coordinated attacks that struck Paris",
      category: "France",
      image: "http://media.vocativ.com/photos/2015/11/paris-attacks-memorial-bra3516076454.jpg"
    };
    var article3Id = Articles.insert(article3);

    // Add episodes
    var episode1 = {
      number: "1",
      name: "Crush",
      synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "http://media.vocativ.com/photos/2015/11/paris-attacks-memorial-bra3516076454.jpg",
      airingAt: new Date(2016, 1, 1),
      includedArticles: [article1Id, article2Id, article3Id],
      includedVideos: []
    };
    Episodes.insert(episode1);
  }
}
