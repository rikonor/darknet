Articles = new Meteor.Collection("articles");

Schemas.Articles = new SimpleSchema({
  url: {
    type: String,
    label: "URL",
    autoform: {
      placeholder: "Link to article"
    }
  },
  name: {
    type: String,
    max: 60,
    autoform: {
      placeholder: "Article name"
    }
  },
  description: {
    type: String,
    max: 300,
    autoform: {
      placeholder: "Video description",
      rows: 5
    }
  },
  image: {
    type: String,
    label: "Image URL",
    autoform: {
      placeholder: "Image URL"
    }
  },
  views: {
    type: Number,
    autoform: {
      type: "hidden"
    }
  }
});

Articles.attachSchema(Schemas.Articles);
