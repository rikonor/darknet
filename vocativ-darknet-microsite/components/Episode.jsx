EpisodeLoader = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    episodeName: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    let episodeHandle = subsManager.subscribe('episodes');

    let episodeTitleRegex = new RegExp(`^${this.props.episodeName}$`, 'i');

    return {
      episodeLoading: ! episodeHandle.ready(),
      episode: Episodes.findOne({title: episodeTitleRegex}, {reactive: false})
    };
  },

  render() {
    if (this.data.episodeLoading) {
      return <div>Loading</div>;
    }

    return (
      <Episode episode={this.data.episode} />
    );
  }
});

Episode = React.createClass({
  renderSections() {
    let sectionsContent = parseSectionsContent(this.props.episode.sections);
    return _.map(sectionsContent, renderSection);
  },

  render() {
    // Redirects to not found if episode is not found
    if (! this.props.episode) {
      FlowRouter.redirect("/404");
      return null;
    }

    // Redirect to home page if episode is not released yet
    if (! this.props.episode.isViewable()) {
      FlowRouter.redirect("/");
    }

    let nextEpisode = this.props.episode.getNext();
    let nextPage = nextEpisode && nextEpisode.isViewable() && {
      title: nextEpisode.title,
      href: nextEpisode.path()
    };

    let episodeUrl = this.props.episode.url;
    let episodeLink = episodeUrl && (
      <div className="episode-link">
        <a href={episodeUrl} target="_blank">Watch the full episode of <span className="upper">{this.props.episode.title}</span> on SHOWTIME</a>
      </div>
    );

    return (
      <div className="episode">
        <Page nextPage={nextPage}>
          <Section>
            <div className="episode-info">
              <div className="title"><span className="title-actual">{this.props.episode.title}</span></div>
              <div className="description">{this.props.episode.longDescription}</div>
              {episodeLink}
            </div>
          </Section>

          {this.renderSections()}

          <EpisodesGalleryLoader />
        </Page>
      </div>
    );
  }
});
