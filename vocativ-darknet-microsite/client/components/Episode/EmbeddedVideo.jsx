EmbeddedVideo = React.createClass({
  render() {
    return (
      <div className="embedded-video">
        <div className="image">
          <a href={this.props.video.url}><img src={this.props.video.image}></img></a>
        </div>
        <div className="name">{this.props.video.name}</div>
        <div className="description">{this.props.video.description}</div>
      </div>
    );
  }
});
