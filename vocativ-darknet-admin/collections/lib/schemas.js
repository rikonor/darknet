Schemas = {};

Schemas.title = function(placeholder) {
  return {
    type: String,
    max: 200,
    autoform: {
      placeholder: placeholder
    }
  };
};

Schemas.description = function(placeholder) {
  return {
    type: String,
    max: 200,
    autoform: {
      placeholder: placeholder
    }
  };
};

Schemas.longDescription = function(placeholder, maxLength) {
  return {
    type: String,
    max: maxLength || 200,
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

Schemas.updatedAt = {
  type: Date,
  label: 'Date',
  autoValue: function () {
    return new Date();
  },
  autoform: {
    type: "hidden"
  }
};

Schemas.relatedEpisode = {
  type: String,
  optional: true,
  label: "Related to episode",
  autoform: {
    type: "select2",
    options: function() {
      return _.map(Episodes.find({}, {sort: { title: 1}}).fetch(), (episode) => {
        return {
          label: episode.title,
          value: episode.title
        };
      });
    },
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

    // Get related episode
    let relatedEpisode = '';
    if (option.value.relatedEpisode) {
      relatedEpisode = `[${option.value.relatedEpisode}]`;
    }

    // The select box can only accept strings
    // So convert whatever value you want to a string
    let value = {
      type: option.type,
      _id: option.value._id
    };

    value = JSON.stringify(value);

    return {
      label: `[${capType}]${relatedEpisode} ${option.value.title}`,
      value: value
    };
  });
};

/*
 sortSectioOptions
*/

let currentSectionIndex = 0;

sortSectionOptions = function(options) {
  // Get the sections
  let form = AutoForm.getCurrentDataForForm();

  if (!form.doc || !form.doc.sections) {
    // If no sections exist, just return the options as they are
    return options;
  }

  let sections = form.doc.sections;
  let currentSection = sections[currentSectionIndex];

  // Increment the currentSection index
  currentSectionIndex = (currentSectionIndex + 1) % sections.length;

  // NOTICE: This is a piece of very convoluted logic
  // It's purpose is to allow reordering of the selections a user makes
  // For this to be possible, the options provided to the select box
  // Must be ordered according to any pre-selected values
  // Otherwise, it will appear in whichever order fetchSectionOptions returned

  // Sort the options
  if (currentSection.content) {
    _.each(currentSection.content, (val) => {
      let idx = -1;
      _.some(options, (option, i) => {
        if (option.value === val) {
          idx = i;
          return true;
        }
      });

      if (idx !== -1) {
        // Move the option to the end
        options.push(options.splice(idx, 1)[0]);
      }
    });
  }

  return options;
};
