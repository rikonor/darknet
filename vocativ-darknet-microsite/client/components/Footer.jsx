Footer = React.createClass({
  currentYear() {
    return (new Date()).getFullYear();
  },

  render() {
    return (
      <div className="footer-container">
        <div className="footer">
          <div className="menu">
            <span className="menu-item"><a href="/">Home</a></span>
            <span className="menu-item"><a href="http://www.vocativ.com/about/terms-use/">Terms of Service</a></span>
            <span className="menu-item"><a href="http://www.vocativ.com/legal/">Privacy Policy</a></span>
          </div>
          <div className="copyright">&copy; Copyright Vocativ {this.currentYear()}</div>
        </div>
      </div>
    );
  }
});
