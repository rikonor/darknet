Nav = React.createClass({
  render() {
    return (
      <div className="nav-container">
        <div className="nav">
          <div className="logos">
            <div className="logo vocativ"><a href="http://www.vocativ.com/"><img src="/images/vocativ-logo.svg" /></a></div>
            <div className="logo darknet"><a href="/">DARKnet</a></div>
          </div>
          <div className="social">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
          </div>
        </div>
      </div>
    );
  }
});
