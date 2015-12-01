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

// Toggle curtain
TurnCurtainOn = function() {
  
};

TurnCurtainOff = function() {

};
