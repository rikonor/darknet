Template.episodeLink.helpers({
  episodeLink: function() {
    var episodeId = this.value;
    return `/admin/Episodes/${episodeId}/edit`;
  },
  episodeName: function() {
    var episodeId = this.value;
    var episode = Episodes.findOne(episodeId);
    return episode.title;
  }
});
