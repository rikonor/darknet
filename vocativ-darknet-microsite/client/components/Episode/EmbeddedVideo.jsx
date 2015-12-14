EmbeddedVideo = React.createClass({
  render() {
    return (
      <div className="embedded-video">
        <a href={this.props.video.url}>
          <div className="image">
            <div className="voc-video-overlay"></div>
            <img src={this.props.video.imageUrl()}></img>
          </div>
          <div className="name">{this.props.video.name}</div>
        </a>
      </div>
    );
  }
});
