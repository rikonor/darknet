// Override meteor-admin not publishing entities on every page
// This is so when editing an episode, you can attach articles and videos to it

Meteor.publish('articles', function() {
  if (! isAdmin(this.userId)) return this.ready();
  return Articles.find();
});

Meteor.publish('videos', function() {
  if (! isAdmin(this.userId)) return this.ready();
  return Videos.find();
});

Meteor.publish('imagesRaw', function() {
  if (! isAdmin(this.userId)) return this.ready();
  return ImagesRaw.find();
});

Meteor.publish('images', function() {
  if (! isAdmin(this.userId)) return this.ready();
  return Images.find();
});
