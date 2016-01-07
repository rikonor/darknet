Footer = React.createClass({
  currentYear() {
    return (new Date()).getFullYear();
  },

  render() {
    return (
      <div className="footer-container">
        <div className="footer">
          <NewsletterSignup />
          <div className="menu">
            <span className="menu-item"><a href="/">Home</a></span>
            <span className="menu-item"><a href="http://www.vocativ.com/about/terms-use/" target="_blank" onClick={createEventTracker('terms-of-use-footer-btn')}>Terms of Service</a></span>
            <span className="menu-item"><a href="http://www.vocativ.com/legal/" target="_blank" onClick={createEventTracker('privacy-policy-footer-btn')}>Privacy Policy</a></span>
            <span className="menu-item"><a href="/sitemap">Sitemap</a></span>
          </div>
          <div className="copyright">&copy; Copyright Vocativ {this.currentYear()}</div>
        </div>
      </div>
    );
  }
});

var NewsletterSignup = React.createClass({
  getCurrentTimestamp() {
    return (new Date()).getTime();
  },

  getInitialState() {
    return {
      timestamp: this.getCurrentTimestamp()
    };
  },

  handleSubmit() {
    this.setState({timestamp: this.getCurrentTimestamp()});
    trackEvent('newsletter-signup-footer');
  },

  render() {
    let tmpStyles = {
      position: 'absolute',
      left: '-5000px'
    };

    return (
      <div className="signup-form" key={this.state.timestamp}>
        <form action="//vocativ.us3.list-manage.com/subscribe/post?u=4ffa741e7ab8a14a6212cbd45&amp;id=a5ec73e244" method="post" target="_blank" onSubmit={this.handleSubmit}>
          <input type="text" name="EMAIL" id="mce-EMAIL" placeholder="Email Address" />
          <button>Sign Up</button>

          <div style={tmpStyles} aria-hidden="true">
            <input type="text" name="b_4ffa741e7ab8a14a6212cbd45_a5ec73e244" tabIndex="-1" value="" />
          </div>
        </form>
      </div>
    );
  }
});
