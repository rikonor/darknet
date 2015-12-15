Schemas = {};

Schemas.createdAt = {
  type: Date,
  label: 'Date',
  autoValue: function () {
    if (this.isInsert) {
      return new Date();
    }
  },
  autoform: {
    type: "hidden"
  }
};

// Section stuff

validateSection = function() {
  // Validate
  var currValue = this.value;
  currValue = _.map(currValue, function(val) { return JSON.parse(val); });

  // Maximum amount of items is 6
  if (currValue.length > 6) {
    console.log("Too many items");
    return "numOfItemsExceeded";
  }

  // Can't mix dataviz and other items
  var containsDataviz = _.some(currValue, function(val) {
    return val.type === "dataviz";
  });

  var containsOtherThenDataviz = _.some(currValue, function(val) {
    return val.type !== "dataviz";
  });

  if (containsDataviz && containsOtherThenDataviz) {
    console.log("Can't mix dataviz and articles/videos");
    return "cantMixDatavizAndOther";
  }
};

fetchSectionOptions = function() {
  function adjust(coll, type) {
    return _.map(coll.find().fetch(), function(value) {
      let res = { type, value };
      return res;
    });
  }

  let videos = adjust(Videos, "video");
  let articles = adjust(Articles, "article");
  let datavizs = adjust(DataViz, "dataviz");

  let options = videos.concat(articles).concat(datavizs);

  return _.map(options, function(option) {
    let capType = strCapitalize(option.type);

    // The select box can only accept strings
    // So convert whatever value you want to a string
    let value = {
      type: option.type,
      _id: option.value._id
    };

    value = JSON.stringify(value);

    return {
      label: `[${capType}] ${option.value.name}`,
      value: value
    };
  });
};
