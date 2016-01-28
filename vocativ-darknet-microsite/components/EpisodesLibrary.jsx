EpisodesLibraryLoader = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let episodesHandle = subsManager.subscribe('episodes');

    return {
      episodesLoading: ! episodesHandle.ready(),
      episodes: Episodes.find({}, {sort: {airingAt: 1}, reactive: false}).fetch()
    };
  },

  render() {
    if (this.data.episodesLoading) {
      return <div>Loading</div>;
    }

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
  trackClick() {
    GAnalytics.event("Navigation", "Episode Grid on HP", this.props.episode.title);
  },

  handleClick() {
    this.trackClick();
  },

  airDate() {
    let episodeAirDate = this.props.episode.airingAt;

    if (! episodeAirDate) {
      return "";
    }

    return moment(episodeAirDate).format("MMMM D");
  },

  render() {
    let libraryEpisodeClasses = 'library-episode';
    if (! this.props.episode.isViewable()) libraryEpisodeClasses += ' coming-soon';

    let linkClassModifier = 'episode-link';
    if (! this.props.episode.isViewable()) linkClassModifier += ' coming-soon';

    return (
      <div className={libraryEpisodeClasses}>
        <div className="image">
          <a className={linkClassModifier} href={"/darknet" + this.props.episode.path()} onClick={this.handleClick}>
            <img src={this.props.episode.imageUrl()}></img>
            <div className="coming-soon-text"><span>COMING SOON</span></div>
          </a>
        </div>
        <div className="name">
          <a className={linkClassModifier} href={"/darknet" + this.props.episode.path()} onClick={this.handleClick}>{this.props.episode.title}</a>
        </div>
        <div className="synopsis">{this.props.episode.shortDescription}</div>
        <div className="air-date">{this.airDate()}</div>
      </div>
    );
  }
});
