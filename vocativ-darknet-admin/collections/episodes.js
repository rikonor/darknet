Episodes = new Mongo.Collection("episodes");

Schemas.Episodes = new SimpleSchema({
  number: {
    // Validate episode number, cant have duplicates
    type: String,
    label: "Episode #",
    autoform: {
      placeholder: "Episode #"
    }
  },
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
    label: 'Airing date'
  },
  image: {
    type: String,
    label: "Image URL",
    autoform: {
      placeholder: "Image URL"
    }
  },
  includedArticles: {
    type: [String],
    optional: true,
    autoform: {
      type: "select-multiple",
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
      type: "select-multiple",
      options: function () {
        return _.map(Videos.find().fetch(), function(video) {
          return {
            label: video.name,
            value: video._id
          };
        });
      }
    }
  }
});

Episodes.attachSchema(Schemas.Episodes);

// Admin Panel options

var routeOptions = adminRoutesWaitOnOptions([
  'articles',
  'videos'
]);

console.log(routeOptions);

EpisodesAdminOptions = {
  icon: 'film',
  tableColumns: [
    { label: '#', name: 'number' },
    { label: 'Name', name: 'name' },
    { label: 'Airing Date', name: 'airingAt' }
  ],
  routes: routeOptions
};
