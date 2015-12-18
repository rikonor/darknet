EpisodesLibraryLoader = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let episodesHandle = subsManager.subscribe('episodes');

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
      return (
        <GridItem key={episode._id}>
          <LibraryEpisode episode={episode} />
        </GridItem>
      );
    });
  },

  render() {
    // Notice the grid filler

    return (
      <div className="episodes-library">
        <div className="header"><h1>Episodes</h1></div>
        <div className="episodes">
          <Grid>
            {this.renderEpisodes()}
          </Grid>
        </div>
      </div>
    );
  }
});

var LibraryEpisode = React.createClass({
  render() {
    let libraryEpisodeClasses = classNames({
      'library-episode': true,
      'coming-soon': ! this.props.episode.isViewable()
    });

    return (
      <div className={libraryEpisodeClasses}>
        <div className="image" onClick={this.handleImageClick}>
          <a href={this.props.episode.path()}>
            <img src={this.props.episode.imageUrl()}></img>
            <div className="coming-soon-text"><span>COMING SOON</span></div>
          </a>
        </div>
        <div className="name"><a href={this.props.episode.path()}>{this.props.episode.title}</a></div>
        <div className="synopsis">{this.props.episode.shortDescription}</div>
      </div>
    );
  }
});
