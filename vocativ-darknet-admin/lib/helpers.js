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

/*
  Helper for embedding children inside of parents
  when the parents have the id of the child

  example:

  parents = [ {name: '1', childId: '5'}, {name: '2', childId: '1'}, {name: '3', childId: '6'} ]
  children = [ {name: '1'}, {name: '5'}, {name: '6'} ]

  `embedChildrenInParents(parents, 'childId', children, 'child')`

  result should be:
  parents = [
  {name: '1', childId: '5', child: {name: '5'}},
  {name: '2', childId: '1', child: {name: '1'}},
  {name: '3', childId: '6', child: {name: '6'}}
  ]
*/

embedChildrenInParents = function(parentObjects, idField, childObjects, fieldName) {
  // Build a mapping of the children to themslves
  var childKeys = {};
  _.each(childObjects, (child) => {
    childKeys[child._id] = child;
  });

  // Embed them into the parents
  _.each(parentObjects, (parent) => {
    parent[fieldName] = childKeys[parent[idField]];
  });

  return parentObjects;
};

// String capitalize
strCapitalize = function(str) {
  if (str) {
    return str.toUpperCase().slice(0, 1) + str.slice(1);
  }
};
