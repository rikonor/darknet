Episode = React.createClass({
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

  renderArticles() {
    if (this.data.articlesLoading) {
      return <div>Loading articles</div>;
    }

    let articleIds = this.data.episode.includedArticles || [];
    let articles = Articles.find({_id: {$in: articleIds}});

    return articles.map((article) => {
      return <EmbeddedArticle key={article._id} article={article} />;
    });
  },

  renderVideos() {
    if (this.data.videosLoading) {
      return <div>Loading videos</div>;
    }

    let videoIds = this.data.episode.includedVideos || [];
    let videos = Videos.find({_id: {$in: videoIds}});

    return videos.map((video) => {
      return <EmbeddedVideo key={video._id} video={video} />;
    });
  },

  render() {
    if (this.data.episodeLoading) {
      return <div>Loading</div>;
    }

    return (
      <div className="episode">
        <div className="episode-info">
          <div>Episode {this.data.episode.number} // {this.data.episode.name}</div>
          <div>{this.data.episode.airingAt.toString()}</div>
          <div>{this.data.episode.synopsis}</div>
        </div>

        <div className="episode-articles">
          {this.renderArticles()}
        </div>

        <div className="episode-videos">
          {this.renderVideos()}
        </div>

        <EpisodesGallery />
      </div>
    );
  }
});
