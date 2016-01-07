const ACTIVE = "active";
const HIDDEN = "hidden";

DataVisualization = React.createClass({
  getInitialState() {
    return {
      state: HIDDEN
    };
  },

  closeLightbox() {
    if (this.state.state === ACTIVE) {
      this.setState({state: HIDDEN});
    }
  },

  openLightbox() {
    if (this.state.state === HIDDEN) {
      this.setState({state: ACTIVE});
    }
  },

  handleClick() {
    this.openLightbox();
    if (this.state.state === HIDDEN) {
      GAnalytics.event("DataViz", "show", this.props.dataviz.title);
    }
  },

  render() {
    let datavizLightbox = null;
    if (this.state.state === ACTIVE) {
      datavizLightbox = (
        <Lightbox onClose={this.closeLightbox}>
          <Image imageUrl={this.props.dataviz.imageUrl()} />
        </Lightbox>
      );
    }

    return (
      <div className="dataviz" onClick={this.handleClick}>
        <Image imageUrl={this.props.dataviz.imageUrl()} />
        {datavizLightbox}
      </div>
    );
  }
});
