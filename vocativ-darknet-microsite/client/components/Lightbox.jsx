Lightbox = React.createClass({
  componentDidMount() {
    $('body').addClass('noscroll');
  },

  componentWillUnmount() {
    $('body').removeClass('noscroll');
  },

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  },

  render() {
    return (
      <div className="lightbox-container" onClick={this.handleClose}>
        <div className="close" onClick={this.handleClose}>
          <i className="fa fa-times"></i>
        </div>

        <div className="lightbox">
          {this.props.children}
        </div>
      </div>
    );
  }
});
