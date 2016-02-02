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

  scrollIntoView(onComplete) {
    // calculate offset so element is in middle of screen
    let screenHeight = $(window).height();
    let miniGalleryHeight = $(".episodes-mini-gallery").height();
    let elementHeight = $(this.refs.videoEmbed).height();
    let offset = (-1) * (screenHeight - miniGalleryHeight - elementHeight) / 2;
    $(this.refs.videoEmbed).velocity("scroll", { offset: offset, complete: onComplete });
  },

  autoUrlOpen() {
    // If the url contains `show` query param with video title
    // Then open the video in a lightbox
    let showTerm = FlowRouter.getQueryParam("show");
    let videoTitle = this.props.video.title;

    if (! showTerm) {
      return;
    }

    if (showTerm.toLowerCase().replace(' ', '') === videoTitle.toLowerCase().replace(' ', '')) {
      this.scrollIntoView(this.openLightbox);
    }
  },

  componentDidMount() {
    this.autoUrlOpen();
  },

  handleClick() {
    this.openLightbox();
    GAnalytics.event("Videos", "play", this.props.video.title);
  },

  render() {
    let youtubeId = this.props.video.youtubeId;
    let videoEmbedUrl = 'https://www.youtube.com/embed/' + youtubeId;

    // Disable related content
    videoEmbedUrl += "?rel=0";

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
      <div className="video-embed" onClick={this.handleClick} ref="videoEmbed">
        <Image imageUrl={this.props.video.imageUrl()}>
          <div className="voc-video-overlay"></div>
        </Image>
        {youtubeEmbed}
      </div>
    );
  }
});
