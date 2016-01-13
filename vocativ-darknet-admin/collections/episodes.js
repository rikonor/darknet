Episodes = new Mongo.Collection("episodes");

Schemas.Episodes = new SimpleSchema({
  createdAt: Schemas.createdAt,
  title: Schemas.title("Episode Title"),
  shortDescription: Schemas.description("Short Episode Description"),
  longDescription: Schemas.longDescription("Long Episode Description", 800),
  url: _.extend(Schemas.url("Link to Episode"), {optional: true}),
  airingAt: Schemas.date("Airing Date", "When does the episode air?"),
  visibleAt: Schemas.date("Visible Date", "When should the episode become visible to visitors?"),
  image: Schemas.image("Episode Cover Image"),
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
    max: 800,
    optional: true,
    label: "Section Description [Optional]"
  },
  "sections.$.content": {
    type: [String],
    optional: true,
    label: "Section Content",
    custom: validateSection,
    autoform: {
      type: "selectize",
      afFieldInput: {
        multiple: true,
        selectizeOptions: {
          plugins: ['drag_drop']
        }
      },
      options: () => {
        let options = fetchSectionOptions();

        if (options) {
          options = sortSectionOptions(options);
        }

        return options;
      },
    }
  },
  "sections.$.discussionInviteText": {
    type: String,
    max: 300,
    optional: true,
    label: "Discussion Invite Text [Optional]"
  },
  "sections.$.discussionInviteLink": {
    type: String,
    max: 100,
    optional: true,
    label: "Discussion Invite Link [Optional]",
    autoValue: function () {
      if (! this.isSet) {
        return "https://www.facebook.com/vocativ";
      }
    },
    autoform: {
      placeholder: "Defaults to www.facebook.com/vocativ..."
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
    { label: 'Airing Date', name: 'airingAt' },
    { label: 'Visible Date', name: 'visibleAt' }
  ],
  routes: adminRoutesWaitOnOptions([
    'episodes',
    'articles',
    'videos',
    'dataviz',
    'images'
  ])
};
