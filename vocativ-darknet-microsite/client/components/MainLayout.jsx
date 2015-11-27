MainLayout = React.createClass({
  render() {
    return (
      <div className="main-layout">
        <Nav />
        <div className="main-content">
          {this.props.content}
        </div>
        <Footer />
      </div>
    );
  }
});
