Footer = React.createClass({
  currentYear() {
    return (new Date()).getFullYear();
  },

  render() {
    return (
      <div className="footer">
        <div className="logo vocativ">Vocativ</div>
        <div className="menu">
          <span className="menu-item">Home</span>
          <span className="menu-item">About DARKnet</span>
          <span className="menu-item">Legal</span>
        </div>
        <div className="copyright">Copyright Vocativ {this.currentYear()}</div>
      </div>
    );
  }
});
