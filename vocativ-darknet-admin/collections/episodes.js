Episodes = new Mongo.Collection("episodes");

Schemas.Episodes = new SimpleSchema({
  createdAt: Schemas.createdAt,
  title: Schemas.title("Episode Title"),
  shortDescription: Schemas.description("Short Episode Description"),
  longDescription: Schemas.longDescription("Long Episode Description"),
  airingAt: Schemas.date("Airing Date", "When does the episode air?"),
  visibleAt: Schemas.date("Visible Date", "When should the episode become visible to visitors?"),
  image: Schemas.image("Episode Cover Image"),
  trailer: {
    type: String,
    optional: true,
    label: "Trailer [Optional]",
    autoform: {
      type: "select2",
      options: function () {
        return _.map(Videos.find().fetch(), function(video) {
          return {
            label: video.title,
            value: video._id
          };
        });
      }
    }
  },
  sections: {
    type: Array,
    optional: true,
    maxCount: 6
  },
  "sections.$": {
    type: Object,
  },
  "sections.$.header": {
    type: String,
    max: 43,
    optional: true,
    label: "Section Header [Optional]"
  },
  "sections.$.description": {
    type: String,
    max: 200,
    optional: true,
    label: "Section Description [Optional]"
  },
  "sections.$.content": {
    type: [String],
    optional: true,
    label: "Section Content",
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
    { label: 'Title', name: 'title' },
    { label: 'Airing Date', name: 'airingAt' }
  ],
  routes: adminRoutesWaitOnOptions([
    'articles',
    'videos',
    'dataviz',
    'images'
  ])
};
