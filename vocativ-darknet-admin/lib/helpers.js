isAdmin = function(userId) {
  let user = Meteor.users.findOne(userId);
  if (! user) return false;
  return user.roles.__global_roles__.indexOf('admin') !== -1;
};

// Given a list of subscription names return all of them
multiSubscribe = function(subscriptions) {
  return _.map(subscriptions, function(subName) {
    Meteor.subscribe(subName);
  });
};

// Helper for meteor-admin collection options
// Subscribe a specific route to `subscriptions`
adminRoutesWaitOnOptions = function(subscriptions) {
  var waitOnObj = {
    waitOn: multiSubscribe.bind(null, subscriptions)
  };

  return {
    new: waitOnObj,
    view: waitOnObj,
    edit: waitOnObj
  };
};
