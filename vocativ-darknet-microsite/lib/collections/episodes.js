Episodes = new Meteor.Collection("episodes");

if (Meteor.isServer) {
  Meteor.publish("episodes", function() {
    return Episodes.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("episodes");
}

Episodes.helpers({
  path: function() {
    let pathBase = "/episodes";
    return pathBase + "/" + this.title;
  },
  getNext() {
    let dbQuery = {
      airingAt: {
        $gt: this.airingAt
      }
    };

    return Episodes.findOne(dbQuery);
  },
  imageUrl: function() {
    var imageId = this.image;
    var image = Images.findOne(imageId);

    return image.url();
  },
  hasAired: function() {
    return this.airingAt <= (new Date());
  },
  isViewable: function() {
    return this.visibleAt <= (new Date());
  },
  sectionsContent: function() {
    const typeCollMap = {
      'article': Articles,
      'video': Videos,
      'dataviz': DataViz
    };

    // iterate over each of the sections and process it
    // then iterate over the section contents and retrieve the actual item
    function processSection(section) {
      section.content = _.map(section.content, (item) => {
        let parsedItem = JSON.parse(item);
        let value = typeCollMap[parsedItem.type].findOne(parsedItem._id);

        return {
          type: parsedItem.type,
          value: value
        };
      });

      return section;
    }

    return _.map(this.sections, processSection);
  }
});
