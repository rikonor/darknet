VideoEmbed = React.createClass({
  render() {
    var videoEmbedUrl = 'https://www.youtube.com/embed/' + this.props.youtubeId;

    return (
      <div className="video-embed">
        <iframe src={videoEmbedUrl} frameBorder="0" allowFullScreen />
      </div>
    );
  }
});
