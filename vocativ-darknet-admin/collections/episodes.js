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
  }
});

Episodes.attachSchema(Schemas.Episodes);
