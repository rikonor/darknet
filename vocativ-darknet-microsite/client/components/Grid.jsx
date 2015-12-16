Grid = React.createClass({
  numOfItemsPerRow() {
    // How many items appear on each row should be based on the amount of children
    // Unless this is overriden by the childrenPerRow property

    let numOfChildren = this.props.children.length;

  },

  numOfChildrenToClass() {
    let numOfChildren = this.props.children.length;

    // Should be 2-per line? or 3-per line?
  },

  render() {
    console.log(this.numOfItemsPerRow());

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

GridFiller = React.createClass({
  /*
    Needed in flexbox grids (with justify-content: space-between)
    where the last row is not completely filled

    * * *
    * * *
    *   *

    notice the empty space in the middle, but if you add a GridFiller

    * * *
    * * *
    * * _

    Where _ is the grid filler

    notice, in your css you must make sure it has the same width as the other elements
  */


  render() {
    let gridFillerStyles = {
      height: 0
    };

    return (
      <div className="grid-filler" style={gridFillerStyles}></div>
    );
  }
});
