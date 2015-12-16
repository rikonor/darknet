Schemas = {};

Schemas.title = function(placeholder) {
  return {
    type: String,
    max: 43,
    autoform: {
      placeholder: placeholder
    }
  };
};

Schemas.description = function(placeholder) {
  return {
    type: String,
    max: 90,
    autoform: {
      placeholder: placeholder,
      rows: 5
    }
  };
};

Schemas.image = function(label) {
  return {
    type: String,
    label: label,
    autoform: {
      type: 'imageGallery'
    }
  };
};

Schemas.date = function(label, placeholder) {
  return {
    type: Date,
    label: label,
    autoform: {
      placeholder: placeholder,
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
    }
  };
};

Schemas.url = function(placeholder) {
  return {
    type: String,
    label: "URL",
    autoform: {
      placeholder: placeholder
    }
  };
};

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
