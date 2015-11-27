Footer = React.createClass({
  currentYear() {
    return (new Date()).getFullYear();
  },

  render() {
    return (
      <div className="footer">
        <div className="logo vocativ">Vocativ</div>
        <div className="menu">
          <div className="menu-item">Home</div>
          <div className="menu-item">About DARKnet</div>
          <div className="menu-item">Legal</div>
        </div>
        <div className="copyright">Copyright Vocativ {this.currentYear()}</div>
      </div>
    );
  }
});
