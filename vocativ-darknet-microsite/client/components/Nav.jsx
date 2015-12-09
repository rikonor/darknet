Nav = React.createClass({
  render() {
    return (
      <div className="nav-container">
        <div className="nav">
          <div className="logos">
            <div className="logo vocativ-films"><a href="http://www.vocativ.com/"><img src="/images/vocativ-films-logo.svg" /></a></div>
            <div className="logo darknet"><a href="/"><img src="/images/darknet-logo.svg" /></a></div>
          </div>
          <div className="social">
            <a className="facebook" href="https://www.facebook.com/vocativ" target="_blank"><i className="fa fa-facebook"></i></a>
            <a className="twitter" href="https://www.twitter.com/vocativ" target="_blank"><i className="fa fa-twitter"></i></a>
          </div>
        </div>
      </div>
    );
  }
});
