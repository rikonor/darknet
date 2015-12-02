// HomeLayout is the same as MainLayout - with the addition of curtain
HomeLayout = React.createClass({
  getInitialState() {
    return {
      curtainActive: true
    };
  },

  curtainOn() {
    if (!this.state.curtainActive) this.setState({curtainActive: true});
  },

  curtainOff() {
    if (this.state.curtainActive) this.setState({curtainActive: false});
  },

  render() {
    let mainLayoutClasses = classNames({
      'main-layout': true,
      'curtain-on': this.state.curtainActive
    });

    return (
      <div className={mainLayoutClasses}>
        <Nav />
        <Curtain curtainOn={this.curtainOn} curtainOff={this.curtainOff} />
        <div className="main-content-container">
          <div className="main-content">
            {this.props.content}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});

Home = React.createClass({
  render() {
    return (
      <div className="home">
        <EpisodesLibrary />
      </div>
    );
  }
});

var Curtain = React.createClass({
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
      </div>
    );
  }
});
