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
