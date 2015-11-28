if (Meteor.isServer) {
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
    Tasks: {
      tableColumns: [
        { label: 'Owner', name: 'username' },
        { label: 'Text', name: 'text' },
        { label: 'Creation date', name: 'createdAt' },
        { label: 'OwnerId', name: 'owner' },
        { label: 'Complete', name: 'checked' },
        { label: 'Private', name: 'private' }
      ]
    },
    Episodes: {
      tableColumns: [
        { label: '#', name: 'number' },
        { label: 'Name', name: 'name' },
        { label: 'Airing Date', name: 'airingAt' }
      ],
      routes: {
        new: { waitOn: function () { return _.map(['articles', 'videos'], function(subName) { Meteor.subscribe(subName); }); } },
        view: { waitOn: function () { return _.map(['articles', 'videos'], function(subName) { Meteor.subscribe(subName); }); } },
        edit: { waitOn: function () { return _.map(['articles', 'videos'], function(subName) { Meteor.subscribe(subName); }); } }
      }
    },
    Videos: {
      tableColumns: [
        { label: 'Name', name: 'name' },
        { label: 'Views', name: 'views' }
      ]
    },
    Articles: {
      tableColumns: [
        { label: 'Name', name: 'name' },
        { label: 'Category', name: 'category' },
        { label: 'Views', name: 'views' }
      ]
    }
  }
};

function isAdmin(userId) {
  let user = Meteor.users.findOne(userId);
  if (! user) return false;
  return user.roles.__global_roles__.indexOf('admin') !== -1;
}

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
