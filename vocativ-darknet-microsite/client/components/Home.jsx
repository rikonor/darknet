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
        <Page>
          <Section>
            <div className="video">
              <div>Episode CRUSH Trailer</div>
              <iframe width="100%" height="650" src="https://www.youtube.com/embed/pzN4WGPC4kc" frameBorder="0" allowFullScreen></iframe>
            </div>
          </Section>

          <Section><EpisodesLibraryLoader /></Section>
        </Page>
      </div>
    );
  }
});
