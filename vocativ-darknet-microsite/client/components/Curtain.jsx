Curtain = React.createClass({
  getDefaultProps() {
    return {
      bgImage: "/images/curtain.jpg"
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
            <span className="glitch" data-text="DARK">DARK</span>
            <span className="glitch" data-text="NET">NET</span>
          </div>
          <div className="subheader">from SHOWTIME + VOCATIV FILMS</div>
        </div>
      </div>
    );
  }
});
