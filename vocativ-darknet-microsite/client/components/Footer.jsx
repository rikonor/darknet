Footer = React.createClass({
  currentYear() {
    return (new Date()).getFullYear();
  },

  render() {
    return (
      <div className="footer-container">
        <div className="footer">
          <div className="logo vocativ"><a href="http://www.vocativ.com/"><img src="/images/vocativ-logo.svg" /></a></div>
          <div className="menu">
            <span className="menu-item"><a href="/">Home</a></span>
            <span className="menu-item"><a href="/about">About DARKnet</a></span>
            <span className="menu-item"><a href="/legal">Legal</a></span>
          </div>
          <div className="copyright">&copy; Copyright Vocativ {this.currentYear()}</div>
        </div>
      </div>
    );
  }
});
