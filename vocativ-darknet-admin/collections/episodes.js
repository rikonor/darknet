Episodes = new Mongo.Collection("episodes");

let currentSectionIndex = 0;

Schemas.Episodes = new SimpleSchema({
  createdAt: Schemas.createdAt,
  title: Schemas.title("Episode Title"),
  shortDescription: Schemas.description("Short Episode Description"),
  longDescription: Schemas.longDescription("Long Episode Description", 800),
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
      options: (a) => {
        let options = fetchSectionOptions();

        // Get the sections
        let form = AutoForm.getCurrentDataForForm();
        if (! form.doc.sections) {
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
