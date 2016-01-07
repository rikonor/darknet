/*
  MultiplyArray - Example

  Input: nCopies: 3, arr: [1,2]
  Output: [1, 2, 1, 2, 1, 2]
*/
MultiplyArray = function(nCopies, arr) {
  var result = [];
  for (var i = 0; i < nCopies; i++) {
    for (var j = 0; j < arr.length; j++) {
      result.push(arr[j]);
    }
  }
  return result;
};

/*
  mockEpisodes - Example

  Input: an example episode
  Output: An array of similar episodes with random _ids
*/

mockEpisodes = function(episode) {
  if (!episode) return [];

  // clone episode
  let mockedEpisodes = MultiplyArray(10, [episode]);

  // randomize the keys
  return _.map(mockedEpisodes, (episode) => {
    var newEpisode = _.clone(episode);
    newEpisode._id = Random.id();
    return newEpisode;
  });
};

/*
  isElementInView - Example

  Input: A jQuery element
  Output: true if the element is even partly in view, otherwise false
*/

isElementInView = function(el) {
  let elTop = el.offset().top;
  let screenBottomPosition = $(document).scrollTop() + $(window).height();

  return elTop <= screenBottomPosition;
};

/*
  getSectionType - Example

  Input: An episode section content
  Output: if content is uniform, then video/article/dataviz, otherwise "varied"
*/

getSectionType = function(section) {
  if (content && content.length === 0) {
    console.log("Section content cannot be zero length.");
    return undefined;
  }

  let content = section.content;

  let typesFound = {};
  content.forEach((item) => {
    typesFound[item.type] = true;
  });

  typesFound = Object.keys(typesFound);
  if (typesFound.length === 1) {
    return typesFound[0];
  }

  return "varied";
};

/*
  isAdmin
*/

isAdmin = function(userId) {
  // If no userId, check self
  userId = userId || Meteor.userId();

  let user = Meteor.users.findOne(userId);
  if (! user) return false;
  return user.roles.__global_roles__.indexOf('admin') !== -1;
};
