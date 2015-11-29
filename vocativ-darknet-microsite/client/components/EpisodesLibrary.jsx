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
        <div className="header">Episodes</div>
        <div className="episodes">
          {this.renderEpisodes()}
        </div>
      </div>
    );
  }
});

var LibraryEpisode = React.createClass({
  render() {
    return (
      <div className="library-episode">
        <div className="image">
          <img src={this.props.episode.image}></img>
        </div>
        <div className="name">{this.props.episode.number}. {this.props.episode.name}</div>
        <div className="synopsis">{this.props.episode.synopsis}</div>
      </div>
    );
  }
});
