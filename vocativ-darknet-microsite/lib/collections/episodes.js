Episodes = new Meteor.Collection("episodes");

if (Meteor.isServer) {
  Meteor.publish("episodes", function() {
    return Episodes.find();
  });
}

if (Meteor.isClient) {
  subsManager.subscribe("episodes");
}

Episodes.helpers({
  path: function() {
    let pathBase = "/darknet/episodes";
    return pathBase + "/" + this.title;
  },
  getNext() {
    let dbQuery = {
      airingAt: {
        $gt: this.airingAt
      }
    };

    return Episodes.findOne(dbQuery, {sort: {airingAt: 1}});
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
    // Admins can view regardless
    if (isAdmin()) {
      return true;
    }

    return this.visibleAt <= (new Date());
  }
});
