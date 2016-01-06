GeneralSettings = new Meteor.Collection("generalSettings");

Schemas.GeneralSettings = new SimpleSchema({
  updatedAt: Schemas.updatedAt,
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

GeneralSettings.attachSchema(Schemas.GeneralSettings);

// Admin Panel options

GeneralSettingsAdminOptions = {
  label: 'Home Page Settings',
  icon: 'bar-chart',
  tableColumns: [
    { label: 'Last Updated', name: 'updatedAt' }
  ],
  routes: adminRoutesWaitOnOptions([
    'articles',
    'videos',
    'dataviz'
  ])
};
