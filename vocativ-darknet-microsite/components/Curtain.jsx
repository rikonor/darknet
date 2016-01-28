Curtain = React.createClass({
  getDefaultProps() {
    return {
      bgImage: "/darknet/images/curtain.jpg"
    };
  },

  isCurtainVisible() {
    return window.pageYOffset <= this.refs.curtain.clientHeight;
  },

  handleScroll() {
    let _ = this.isCurtainVisible() ? this.props.curtainOn() : this.props.curtainOff();
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  render() {
    return (
      <div className="curtain" ref="curtain">
        <div className="curtain-image">
          <img src={this.props.bgImage}></img>
        </div>
        <div className="curtain-text">
          <div className="header">
            <div className="logo darknet"><img src="/darknet/images/darknet-logo-nocircle.svg" /></div>
          </div>
          <div className="subheader">
            <div className="subheader-from">FROM</div>
            <div className="logo showtime"><img src="/darknet/images/showtime-logo-white.svg" /></div>
            <div className="subheader-plus">+</div>
            <div className="logo vocativ-films"><img src="/darknet/images/vocativ-films-logo-white.svg" /></div>
          </div>
        </div>
      </div>
    );
  }
});
