isAdmin = function(userId) {
  let user = Meteor.users.findOne(userId);
  if (! user) return false;
  return user.roles.__global_roles__.indexOf('admin') !== -1;
};

// Given a list of subscription names return all of them
multiSubscribe = function(subscriptions) {
  return _.map(['articles', 'videos'], function(subName) {
    Meteor.subscribe(subName);
  });
};

adminRoutesWaitOnOptions = function(subscriptions) {
  var waitOnObj = {
    waitOn: multiSubscribe.bind(subscriptions)
  };

  return {
    new: waitOnObj,
    view: waitOnObj,
    edit: waitOnObj
  };
};
