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
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
          </div>
        </div>
      </div>
    );
  }
});
