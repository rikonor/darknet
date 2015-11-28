EpisodesGallery = React.createClass({
  render() {
    return (
      <div className="episodes-mini-gallery">
        <div className="scroll left">Left</div>
        <div className="scroll right">Right</div>

        <div className="episodes">
          <GalleryEpisode episodeName="Crush"/>
          <GalleryEpisode episodeName="Ctrl"/>
          <GalleryEpisode episodeName="Upgrade"/>
        </div>
      </div>
    );
  }
});

var GalleryEpisode = React.createClass({
  render() {
    return (
      <div className="gallery-episode">
        <div className="image">image</div>
        <div className="name">{this.props.episodeName}</div>
      </div>
    );
  }
});
