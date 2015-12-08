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

// Helper for getting associated ids and then re-associating
getAssociatedEntities = function(sourceObjects, idField, targetCollection) {
  var targetIds = _.pluck(sourceObjects, idField);
  var targets = targetCollection.find({_id: {$in: targetIds}}).fetch();

  return targets;
};

// Helper for embedding an object inside of another
embedObjects = function(parentObjects, childObjects, fieldName) {
  return _.map(_.zip(parentObjects, childObjects), function(pair) {
    var parent = pair[0];
    var child = pair[1];

    parent[fieldName] = child;
    return parent;
  });
};
