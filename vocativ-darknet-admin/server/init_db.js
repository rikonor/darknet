// Data Initialization

function initAdmin() {
  if (Meteor.users.find().count() === 0) {
    console.log("Initializing admin.");

    Accounts.createUser({
      username: "rikonor",
      email: "rikonor@gmail.com",
      password: "rikonor1234"
    });
  }
}

function initGeneralSettings() {
  let gsCount = GeneralSettings.find().count();

  if (gsCount > 1) {
    console.log("Warning: GeneralSettings should be a singleton.");
    console.log("However, more then one instance was found.");
    console.log("Removing all extras and leaving only the most up-to-date one.");

    generalSettingsObjects = GeneralSettings.find({}, {sort: {updatedAt: -1}}).fetch();

    // Most up-to-date should be first according to our sort param

    // Ignore the most up-to-date
    generalSettingsObjects.shift();

    // Remove all remaining generalSettingsObjects
    idsToRemove = _.map(generalSettingsObjects, (gs) => {
      return gs._id;
    });

    GeneralSettings.remove({_id: {$in: idsToRemove}});
  }

  if (gsCount === 0) {
    console.log("Initializing GeneralSettings.");
    GeneralSettings.insert({});
  }
}

initAdmin();
initGeneralSettings();
