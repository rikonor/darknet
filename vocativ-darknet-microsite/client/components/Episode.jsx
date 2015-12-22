EpisodeLoader = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    episodeName: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    let episodeHandle = subsManager.subscribe('episodes');

    return {
      episodeLoading: ! episodeHandle.ready(),
      episode: Episodes.findOne({title: this.props.episodeName}, {reactive: false})
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
  renderSectionItem(sectionItem, i) {
    switch(sectionItem.type) {
      case 'video':
        item = <VideoCard video={sectionItem.value} />;
        break;

      case 'article':
        item = <ArticleCard article={sectionItem.value} />;
        break;

      case 'dataviz':
        item = <DataVisualization dataviz={sectionItem.value} />;
        break;
    }

    return (
      <GridItem key={i}>
        {item}
      </GridItem>
    );
  },

  renderSection(section, i) {
    // Temporarily taken out of the section
    let sectionTop = (
      <div className="section-top-text">
        <div className="header">{section.header}</div>
        <div className="description">{section.description}</div>
      </div>
    );

    return (
      <Section key={i} type={getSectionType(section)}>
        {sectionTop}
        <Grid>
          {_.map(section.content, this.renderSectionItem)}
        </Grid>
      </Section>
    );
  },

  renderSections() {
    let sectionsContent = this.props.episode.sectionsContent();
    return _.map(sectionsContent, this.renderSection);
  },

  render() {
    let nextEpisode = this.props.episode.getNext();
    let nextPage = nextEpisode && nextEpisode.isViewable() && {
      title: nextEpisode.title,
      href: nextEpisode.path()
    };

    return (
      <div className="episode">
        <Page nextPage={nextPage}>
          <Section>
            <div className="episode-info">
              <div className="title"><span className="title-actual">{this.props.episode.title}</span></div>
              <div className="description">{this.props.episode.longDescription}</div>
            </div>
          </Section>

          {this.renderSections()}

          <EpisodesGalleryLoader />
        </Page>
      </div>
    );
  }
});
