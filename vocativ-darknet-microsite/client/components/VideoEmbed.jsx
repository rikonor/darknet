const STOPPED = "stopped";
const PLAYING = "playing";

VideoEmbed = React.createClass({
  getInitialState() {
    return {
      state: STOPPED
    };
  },

  closeLightbox() {
    if (this.state.state === PLAYING) {
      this.setState({state: STOPPED});
    }
  },

  openLightbox() {
    if (this.state.state === STOPPED) {
      this.setState({state: PLAYING});
    }
  },

  handleClick() {
    this.openLightbox();
  },

  render() {
    let youtubeId = this.props.video.youtubeId;
    let videoEmbedUrl = 'https://www.youtube.com/embed/' + youtubeId;

    let youtubeEmbed = null;
    if (this.state.state === PLAYING) {
      youtubeEmbed = (
        <Lightbox onClose={this.closeLightbox}>
          <iframe height="100%" width="100%"
            src={videoEmbedUrl}
            frameBorder="0"
            allowFullScreen
            autoPlay />
        </Lightbox>
      );
    }

    return (
      <div className="video-embed" onClick={this.handleClick}>
        <Image imageUrl={this.props.video.imageUrl()}>
          <div className="voc-video-overlay"></div>
        </Image>
        {youtubeEmbed}
      </div>
    );
  }
});
