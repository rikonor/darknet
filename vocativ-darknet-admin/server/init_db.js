// Data Initialization

function initAdmin() {
  if (Meteor.users.find().count() === 0) {
    console.log("Initializing admin");

    Accounts.createUser({
      username: "rikonor",
      email: "rikonor@gmail.com",
      password: "rikonor1234"
    });
  }
}

initAdmin();
