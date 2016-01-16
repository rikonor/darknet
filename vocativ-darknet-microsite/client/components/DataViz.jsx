const ACTIVE = "active";
const HIDDEN = "hidden";

DataVisualization = React.createClass({
  getInitialState() {
    return {
      state: HIDDEN,
      adaptiveHeight: '0px'
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

  getUnderlyingImage() {
    // Get the img element inside of the dataviz (notice: not lightbox img)
    let imageDOMNode = ReactDOM.findDOMNode(this.refs.image);
    let imageJQuery = $(imageDOMNode);
    let img = imageJQuery.children("img");
    return img;
  },

  adaptHeight() {
    // Notice this functionality is only desired on small screens
    let img = this.getUnderlyingImage();
    // Get the img height and set it as the Image height
    let height = img.height();
    this.setState({adaptiveHeight: height + 'px'});
  },

  componentDidMount() {
    this.getUnderlyingImage().load(this.adaptHeight);
    window.addEventListener("resize", this.adaptHeight);
  },

  componentWillUnmount() {
    window.removeEventListener("resize", this.adaptHeight);
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
        <Image imageUrl={this.props.dataviz.imageUrl()} ref="image" height={this.state.adaptiveHeight} />
        {datavizLightbox}
      </div>
    );
  }
});
