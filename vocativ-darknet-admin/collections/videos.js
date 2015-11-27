Videos = new Mongo.Collection("videos");

Schemas.Videos = new SimpleSchema({
  url: {
    type: String,
    label: "URL",
    autoform: {
      placeholder: "Link to video"
    }
  },
  name: {
    type: String,
    max: 60,
    autoform: {
      placeholder: "Video name"
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

Videos.attachSchema(Schemas.Videos);
