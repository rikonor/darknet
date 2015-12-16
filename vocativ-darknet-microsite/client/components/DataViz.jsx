DataVisualization = React.createClass({
  render() {
    return (
      <div className="dataviz">
        <Image imageUrl={this.props.dataviz.imageUrl()} />
      </div>
    );
  }
});
