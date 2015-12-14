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
              <div className="intro-description">
                <div className="description-1">DARK NET is an eight-part docuseries that explores the netherworld where virtual and physical lives collide in ways surprising, disturbing, and seemingly inevitable. DARK NET reveals the perspective of a digitally connected world where our every action is collected and stored. Each episode sheds light on themes such as bio-hacking, cyberkidnapping, digital warfare, online cults, the webcam sex trade and more.</div>
                <div className="description-2">We're taking you inside the deep web, where 80% of the internet lies beyond the reach of regular search engines.</div>
                <div classname="description-airdate">Episodes air on Thursdays at 11 pm ET Watch full episodes on showtime.com</div>
              </div>
            </div>
          </Section>

          <Section><EpisodesLibraryLoader /></Section>
        </Page>
      </div>
    );
  }
});
