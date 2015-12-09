DataVisualization = React.createClass({
  render() {
    return (
      <div className="dataviz">
        <div className="header">
          <span>Data Visualization</span>
        </div>
        <div className="image">
          <img src={this.props.dataviz.imageUrl()} />
        </div>
      </div>
    );
  }
});
