EpisodeLoader = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    episodeName: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    let episodeHandle = Meteor.subscribe('episodes');
    let articlesHandle = Meteor.subscribe('articles');
    let videosHandle = Meteor.subscribe('videos');

    return {
      episodeLoading: ! episodeHandle.ready(),
      articlesLoading: ! articlesHandle.ready(),
      videosLoading: ! videosHandle.ready(),
      episode: Episodes.findOne({name: this.props.episodeName})
    };
  },

  render() {
    if (this.data.episodeLoading || this.data.articlesLoading || this.data.videosLoading) {
      return <div>Loading</div>;
    }

    return (
      <Episode episode={this.data.episode} />
    );
  }
});

Episode = React.createClass({
  renderArticles() {
    let articleIds = this.props.episode.includedArticles || [];
    let articles = Articles.find({_id: {$in: articleIds}});

    return articles.map((article) => {
      return <EmbeddedArticle key={article._id} article={article} />;
    });
  },

  renderVideos() {
    let videoIds = this.props.episode.includedVideos || [];
    let videos = Videos.find({_id: {$in: videoIds}});

    return videos.map((video) => {
      return <EmbeddedVideo key={video._id} video={video} />;
    });
  },

  renderDataViz() {
    let datavizId = this.props.episode.includedDataViz;
    let dataviz = DataViz.findOne(datavizId);

    return <DataVisualization dataviz={dataviz} />;
  },

  renderTrailer() {
    let trailerId = this.props.episode.trailer;
    let trailer = Videos.findOne(trailer);

    return <VideoEmbed video={trailer} />;
  },

  render() {
    return (
      <div className="episode">
        <Page>
          <Section>
            <div className="episode-info">
              <div className="name">Episode <span className="name-actual">{this.props.episode.name}</span></div>
              <div className="synopsis">{this.props.episode.synopsis}</div>
            </div>
          </Section>

          <Section>
            <div className="episode-videos">
              <div className="videos-list">
                {this.renderVideos()}
              </div>
              <div className="synopsis">{this.props.episode.synopsis}</div>
            </div>
          </Section>

          <Section>
            <div className="episode-dataviz">
              {this.renderDataViz()}
            </div>
          </Section>

          <Section>
            <div className="episode-articles">
              <div className="header">
                <div className="vocativ-notice">Read articles related to episode <span className="episode-name">{this.props.episode.name}</span> on <a href="http://www.vocativ.com">vocativ.com</a></div>
              </div>
              <div className="articles-list">
                {this.renderArticles()}
              </div>
            </div>
          </Section>

          <EpisodesGalleryLoader />
        </Page>
      </div>
    );
  }
});
