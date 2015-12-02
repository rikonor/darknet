EpisodesGallery = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let episodesHandle = Meteor.subscribe('episodes');

    return {
      episodesLoading: ! episodesHandle.ready(),
      episodes: Episodes.find().fetch()
    };
  },

  renderEpisodes() {
    this.data.episodes = mockEpisodes(this.data.episodes[0]);

    return this.data.episodes.map((episode) => {
      return <GalleryEpisode key={episode._id} episode={episode} />;
    });
  },

  render() {
    if (this.data.episodesLoading) {
      return <div>Loading</div>;
    }

    return (
      <div className="episodes-mini-gallery">
        <div className="scroll left"><i className="fa fa-angle-left"></i></div>
        <div className="scroll right"><i className="fa fa-angle-right"></i></div>

        <div className="episodes">
          {this.renderEpisodes()}
        </div>
      </div>
    );
  }
});

var GalleryEpisode = React.createClass({
  getEpisodePath() {
    let pathBase = "/episodes";
    return pathBase + "/" + this.props.episode.number;
  },

  render() {
    return (
      <div className="gallery-episode">
        <div className="image">
          <img src={this.props.episode.image}></img>
        </div>
        <div className="name"><a href={this.getEpisodePath()}>{this.props.episode.number}. {this.props.episode.name}</a></div>
      </div>
    );
  }
});
