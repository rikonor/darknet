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
        <div className="lightbox">
          <div className="close" onClick={this.handleClose}>
            <i className="fa fa-times"></i>
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
});
