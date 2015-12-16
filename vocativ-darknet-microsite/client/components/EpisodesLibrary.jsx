EpisodesLibraryLoader = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let episodesHandle = Meteor.subscribe('episodes');

    return {
      episodesLoading: ! episodesHandle.ready(),
      episodes: Episodes.find({}, {sort: {airingAt: 1}}).fetch()
    };
  },

  render() {
    if (this.data.episodesLoading) {
      return <div>Loading</div>;
    }

    // Mock some more episodes
    // this.data.episodes = mockEpisodes(this.data.episodes[0]);

    return <EpisodesLibrary episodes={this.data.episodes} />;
  }
});

EpisodesLibrary = React.createClass({
  renderEpisodes() {
    return this.props.episodes.map((episode) => {
      return <LibraryEpisode key={episode._id} episode={episode} />;
    });
  },

  render() {
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
    return pathBase + "/" + this.props.episode.title;
  },

  render() {
    let libraryEpisodeClasses = classNames({
      'library-episode': true,
      'coming-soon': ! this.props.episode.hasAired()
    });

    return (
      <div className={libraryEpisodeClasses}>
        <div className="image" onClick={this.handleImageClick}>
          <a href={this.getEpisodePath()}>
            <img src={this.props.episode.imageUrl()}></img>
            <div className="coming-soon-text"><span>COMING SOON</span></div>
          </a>
        </div>
        <div className="name"><a href={this.getEpisodePath()}>{this.props.episode.title}</a></div>
        <div className="synopsis">{this.props.episode.description}</div>
      </div>
    );
  }
});
