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
  sections: {
    type: Array,
    optional: true
  },
  "sections.$": {
    type: Object,
  },
  "sections.$.content": {
    type: [String],
    optional: true,
    label: "Section content",
    custom: validateSection,
    autoform: {
      type: "select2",
      afFieldInput: { multiple: true },
      options: fetchSectionOptions,
    }
  }
});

// Custom error messages
SimpleSchema.messages({
  "numOfItemsExceeded": "Section can't contain more then 6 items",
  "cantMixDatavizAndOther": "Can't mix DataViz with other items"
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
