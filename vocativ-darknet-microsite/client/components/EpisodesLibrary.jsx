EpisodesLibrary = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let episodesHandle = Meteor.subscribe('episodes');

    return {
      episodesLoading: ! episodesHandle.ready(),
      episodes: Episodes.find().fetch()
    };
  },

  renderEpisodes() {
    return this.data.episodes.map((episode) => {
      return <LibraryEpisode key={episode._id} episode={episode} />;
    });
  },

  render() {
    if (this.data.episodesLoading) {
      return <div>Loading</div>;
    }

    return (
      <div className="episodes-library">
        <div className="header"><h1>Episodes</h1></div>
        <div className="episodes">
          {this.renderEpisodes()}
        </div>
      </div>
    );
  }
});

var LibraryEpisode = React.createClass({
  getEpisodePath() {
    let pathBase = "/episodes";
    return pathBase + "/" + this.props.episode.number;
  },

  render() {
    return (
      <div className="library-episode">
        <div className="image">
          <div className="voc-video-overlay"></div>
          <img src={this.props.episode.image}></img>
        </div>
        <div className="name"><a href={this.getEpisodePath()}>{this.props.episode.number}. {this.props.episode.name}</a></div>
        <div className="synopsis">{this.props.episode.synopsis}</div>
      </div>
    );
  }
});
