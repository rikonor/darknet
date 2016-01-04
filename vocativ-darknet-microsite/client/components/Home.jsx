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
    let videosHandle = subsManager.subscribe('videos');
    let generalSettingsHandle = subsManager.subscribe('generalSettings');

    return {
      videosLoading: ! videosHandle.ready(),
      generalSettingsLoading: ! generalSettingsHandle.ready(),
      generalSettings: GeneralSettings.findOne({}, {reactive: false})
    };
  },

  render() {
    if (this.data.videosLoading && this.data.generalSettingsLoading) {
      return <div>Loading</div>;
    }

    return (
      <Home generalSettings={this.data.generalSettings} />
    );
  }
});

Home = React.createClass({
  render() {
    // Prepare nextPage object [first episode]
    let episode = Episodes.findOne({}, {sort: {airingAt: 1}, reactive: false});
    let nextPage = episode && episode.isViewable() && {
      title: episode.title,
      href: episode.path()
    };

    // get trailer
    let trailer = Videos.findOne(this.props.generalSettings.trailerId, {reactive: false});

    return (
      <div className="home">
        <Page nextPage={nextPage}>
          <div className="hero">
            <Section>
              <Image imageUrl="/images/curtain.jpg" />
            </Section>
          </div>

          <Section>
            <HomeIntro />
          </Section>

          <Section>
            <Grid>
              <GridItem>
                <VideoCard video={trailer} />
              </GridItem>
            </Grid>
          </Section>

          <Section>
            <EpisodesLibraryLoader />
          </Section>
        </Page>
      </div>
    );
  }
});

var HomeIntro = React.createClass({
  render() {
    let description1 = "DARK NET is an eight-part docuseries that explores the netherworld where virtual and physical lives collide in ways surprising, disturbing, and seemingly inevitable. DARK NET reveals the perspective of a digitally connected world where our every action is collected and stored. Each episode sheds light on themes such as bio-hacking, cyberkidnapping, digital warfare, online cults, the webcam sex trade and more.";
    let description2 = "We're taking you inside the deep web, where 80% of the internet lies beyond the reach of regular search engines.";

    return (
      <div className="intro">
        <div className="intro-header">
          <div className="header">
            <span className="glitch" data-text="DARK">DARK</span>
            <span className="glitch" data-text="NET">NET</span>
          </div>
          <div className="subheader">from SHOWTIME + VOCATIV</div>
        </div>
        <div className="intro-description">
          <div className="description-header">This is DARK NET</div>
          <div className="description-1">{description1}</div>
          <div className="description-2">{description2}</div>
          <div className="description-airdate">
            <p>Episodes air on Thursdays at 11 pm ET</p>
            <p>Watch full episodes on showtime.com</p>
          </div>
          <div className="logo showtime"><a href="http://www.showtime.com/" target="_blank" onClick={createEventTracker('showtime-home-btn')}><img src="/images/showtime-logo.svg" /></a></div>
        </div>
      </div>
    );
  }
});
