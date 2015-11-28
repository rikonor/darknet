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

    let articleIds = ["p8AA2dpxy892dS3eP", "BTh9Tp8v9iuFzfamh", "3c2326CHtBb4jEbGg"];
    let articles = Articles.find({_id: {$in: articleIds}});

    return articles.map((article) => {
      return <EmbeddedArticle key={article._id} article={article} />;
    });
  },

  renderVideos() {
    if (this.data.videosLoading) {
      return <div>Loading videos</div>;
    }

    return (
      <div className="episode-videos">
        <EmbeddedVideo />
      </div>
    );
  },

  render() {
    if (this.data.episodeLoading) {
      return <div>Loading</div>;
    }

    return (
      <div className="episode">
        <div className="episode-info">
          <div>Episode {this.data.episode.number}</div>
          <div>{this.data.episode.name}</div>
          <div>{this.data.episode.airingAt.toString()}</div>
          <div>{this.data.episode.synopsis}</div>
        </div>

        <div className="episode-articles">
          {this.renderArticles()}
        </div>

        {this.renderVideos()}

        <EpisodesGallery />
      </div>
    );
  }
});
