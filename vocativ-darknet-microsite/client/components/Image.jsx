Image = React.createClass({
  render() {
    return (
      <div className="image">
        {this.props.children}
        <img src={this.props.imageUrl}></img>
      </div>
    );
  }
});
