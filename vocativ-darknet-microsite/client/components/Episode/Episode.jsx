Episode = React.createClass({
  propTypes: {
    episodeId: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="episode">
        <div>Welcome to episode {this.props.episodeId}</div>
        <EmbeddedVideo />
        <EmbeddedArticle />
        <EpisodesGallery />
      </div>
    );
  }
});
