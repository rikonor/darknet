EpisodeLoader = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    episodeId: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    let episodeHandle = Meteor.subscribe('episodes');
    let articlesHandle = Meteor.subscribe('articles');
    let videosHandle = Meteor.subscribe('videos');

    return {
      episodeLoading: ! episodeHandle.ready(),
      articlesLoading: ! articlesHandle.ready(),
      videosLoading: ! videosHandle.ready(),
      episode: Episodes.findOne({number: this.props.episodeId})
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

  render() {
    return (
      <div className="episode">
        <Page>
          <Section>
            <div className="episode-info">
              <div>Episode {this.props.episode.number} // {this.props.episode.name}</div>
              <div>{this.props.episode.airingAt.toString()}</div>
              <div>{this.props.episode.synopsis}</div>
            </div>
          </Section>

          <Section>
            <div className="episode-articles">
              <div className="header">
                <div className="episode-name">Episode {this.props.episode.number} // {this.props.episode.name}</div>
                <div className="vocativ-notice">Read articles related to episode {this.props.episode.number} // {this.props.episode.name} on <a href="http://www.vocativ.com">vocativ.com</a></div>
              </div>
              <div className="articles-list">
                {this.renderArticles()}
              </div>
            </div>
          </Section>

          <Section>
            <div className="header">
              <div className="episode-name">Episode {this.props.episode.number} // {this.props.episode.name}</div>
              <div className="vocativ-notice">View videos related to episode {this.props.episode.number} // {this.props.episode.name} on <a href="http://www.vocativ.com">vocativ.com</a></div>
            </div>
            <div className="episode-videos">
              {this.renderVideos()}
            </div>
          </Section>

          <EpisodesGalleryLoader />
        </Page>
      </div>
    );
  }
});
