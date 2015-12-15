Episodes = new Mongo.Collection("episodes");

Schemas.Episodes = new SimpleSchema({
  createdAt: Schemas.createdAt,
  name: {
    type: String,
    max: 60,
    autoform: {
      placeholder: "Episode name"
    }
  },
  synopsis: {
    type: String,
    max: 300,
    autoform: {
      placeholder: "What is this episode about?",
      rows: 5
    }
  },
  airingAt: {
    type: Date,
    label: 'Airing date',
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
    }
  },
  image: {
    type: String,
    autoform: {
      type: 'imageGallery'
    }
  },
  includedArticles: {
    type: [String],
    optional: true,
    autoform: {
      type: "select2",
      afFieldInput: { multiple: true },
      options: function () {
        return _.map(Articles.find().fetch(), function(article) {
          return {
            label: article.name,
            value: article._id
          };
        });
      }
    }
  },
  includedVideos: {
    type: [String],
    optional: true,
    autoform: {
      type: "select2",
      afFieldInput: { multiple: true },
      options: function () {
        return _.map(Videos.find().fetch(), function(video) {
          return {
            label: video.name,
            value: video._id
          };
        });
      }
    }
  },
  trailer: {
    type: String,
    optional: true,
    autoform: {
      type: "select2",
      options: function () {
        return _.map(Videos.find().fetch(), function(video) {
          return {
            label: video.name,
            value: video._id
          };
        });
      }
    }
  },
  includedDataViz: {
    type: String,
    optional: true,
    autoform: {
      type: "select2",
      options: function () {
        return _.map(DataViz.find().fetch(), function(dataviz) {
          return {
            label: dataviz.name,
            value: dataviz._id
          };
        });
      }
    }
  },
  section1Content: {
    type: [String],
    optional: true,
    autoform: {
      type: "select2",
      afFieldInput: { multiple: true },
      options: function() {
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
      }
    }
  }
});

Episodes.attachSchema(Schemas.Episodes);

// Admin Panel options

EpisodesAdminOptions = {
  icon: 'film',
  tableColumns: [
    { label: 'Name', name: 'name' },
    { label: 'Airing Date', name: 'airingAt' }
  ],
  routes: adminRoutesWaitOnOptions([
    'articles',
    'videos',
    'dataviz',
    'images'
  ])
};
