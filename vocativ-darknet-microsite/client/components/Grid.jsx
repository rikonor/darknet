Grid = React.createClass({
  numOfChildrenToClass() {
    let numOfChildren = this.props.children.length;

    // Should be 2-per line? or 3-per line?
  },

  render() {
    let classNames = {
      'grid': true
    };
    // classNames[numOfChildrenToClass()] = true;

    // Grid Children should only be GridItems
    return (
      <div className="grid">
        {this.props.children}
      </div>
    );
  }
});

GridItem = React.createClass({
  render() {
    return (
      <div className="grid-item">
        {this.props.children}
      </div>
    );
  }
});
