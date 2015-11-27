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
      ]
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
        { label: 'Views', name: 'views' }
      ]
    }
  }
};
