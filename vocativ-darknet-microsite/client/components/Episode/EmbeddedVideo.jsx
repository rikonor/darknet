EmbeddedVideo = React.createClass({
  render() {
    return (
      <div className="embedded-video">
        <div className="image">
          <div className="voc-video-overlay"></div>
          <a href={this.props.video.url}><img src={this.props.video.imageUrl()}></img></a>
        </div>
        <div className="name">{this.props.video.name}</div>
      </div>
    );
  }
});
