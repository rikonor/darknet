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

HomeLoader = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let videosHandle = Meteor.subscribe('videos');

    return {
      videosLoading: ! videosHandle.ready(),
      trailer: Videos.findOne('TQWGzyQgQJq9bQmTW')
    };
  },

  render() {
    if (this.data.videosLoading) {
      return <div>Loading</div>;
    }

    return (
      <Home trailer={this.data.trailer} />
    );
  }
});

Home = React.createClass({
  render() {
    return (
      <div className="home">
        <Page>
          <Section>
            <VideoEmbed video={this.props.trailer} />

            <div className="intro">
              <div className="intro-header">
                <div className="header">DARK NET</div>
                <div className="subheader">from SHOWTIME + VOCATIV</div>
              </div>
              <div className="intro-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            </div>
          </Section>

          <Section><EpisodesLibraryLoader /></Section>
        </Page>
      </div>
    );
  }
});
