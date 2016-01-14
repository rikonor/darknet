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
    let generalSettingsHandle = subsManager.subscribe('generalSettings');

    return {
      generalSettingsLoading: ! generalSettingsHandle.ready(),
      generalSettings: GeneralSettings.findOne({}, {reactive: false})
    };
  },

  render() {
    if (this.data.generalSettingsLoading) {
      return <div>Loading</div>;
    }

    return (
      <Home generalSettings={this.data.generalSettings} />
    );
  }
});

Home = React.createClass({
  renderSections() {
    let sectionsContent = parseSectionsContent(this.props.generalSettings.sections);
    return _.map(sectionsContent, renderSection);
  },

  render() {
    // Prepare nextPage object [first episode]
    let episode = Episodes.findOne({}, {sort: {airingAt: 1}, reactive: false});
    let nextPage = episode && episode.isViewable() && {
      title: episode.title,
      href: episode.path()
    };

    return (
      <div className="home">
        <Page nextPage={nextPage}>
          <div className="hero">
            <Section>
              <Image imageUrl="/darknet/images/curtain.jpg" />
            </Section>
          </div>

          <Section>
            <HomeIntro />
          </Section>

          {this.renderSections()}

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
            <div className="logo darknet"><img src="/darknet/images/darknet-logo-nocircle.svg" /></div>
          </div>
          <div className="subheader">
            <div className="subheader-from">FROM</div>
            <div className="logo showtime"><img src="/darknet/images/showtime-logo-white.svg" /></div>
            <div className="subheader-plus">+</div>
            <div className="logo vocativ-films"><img src="/darknet/images/vocativ-films-logo-white.svg" /></div>
          </div>
        </div>
        <div className="intro-description">
          <div className="description-1">{description1}</div>
          <div className="description-2">{description2}</div>
          <div className="description-airdate">
            <p>Episodes air on Thursdays at 11pm ET</p>
            <p><a className="showtime-link" href="http://www.showtime.com" target="_blank" onClick={createEventTracker('showtime-home-btn')}>Watch full episodes on SHOWTIME here</a></p>
            <p><a className="showtime-link" href="http://www.sho.com/sho/dark-net/home" target="_blank" onClick={createEventTracker('showtime-home-btn')}>More information on the series here</a></p>
          </div>
        </div>
      </div>
    );
  }
});
