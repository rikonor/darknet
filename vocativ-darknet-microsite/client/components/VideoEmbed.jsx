VideoEmbed = React.createClass({
  getInitialState() {
    return {
      state: "stopped",
    };
  },

  openLightBox() {
    return (
      <iframe src={videoEmbedUrl} frameBorder="0" allowFullScreen />
    );
  },

  render() {
    let youtubeId = this.props.video.youtubeId;
    let videoEmbedUrl = 'https://www.youtube.com/embed/' + youtubeId;

    return (
      <div className="video-embed">
        <div className="image">
          <div className="voc-video-overlay"></div>
          <img src={this.props.video.imageUrl()}></img>
        </div>
      </div>
    );
  }
});
