Image = React.createClass({
  render() {
    let styles = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div className="image" style={styles}>
        {this.props.children}
        <img src={this.props.imageUrl}></img>
      </div>
    );
  }
});
