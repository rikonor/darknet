VideoCard = React.createClass({
  render() {
    return (
      <div className="card video-card">
        <VideoEmbed video={this.props.video} />
        <div className="title">{this.props.video.title}</div>
      </div>
    );
  }
});
