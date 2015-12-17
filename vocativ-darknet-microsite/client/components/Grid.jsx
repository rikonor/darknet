Grid = React.createClass({
  numOfItemsPerRow() {
    // How many items appear on each row should be based on the amount of children
    // Unless this is overriden by the itemsPerRow property
    let itemsPerRow = this.props.itemsPerRow;

    // Allowed values are [2, 3]
    if (itemsPerRow && [2, 3].indexOf(itemsPerRow) !== -1) {
      return itemsPerRow;
    }

    let numOfChildren = this.props.children.length;

    // If there are 4, then 2 per row
    if (numOfChildren === 4) {
      return 2;
    }

    // Otherwise -> 3 per row
    return 3;
  },

  numOfChildrenToClass() {
    let numOfChildren = this.props.children.length;

    // Should be 2-per line? or 3-per line?
  },

  getRequiredNumberOfFillers() {
    let numOfItemsPerRow = this.numOfItemsPerRow();
    let numOfChildren = this.props.children.length;

    let numOfRows = Math.ceil(numOfChildren / numOfItemsPerRow);
    let numOfFillers = (numOfRows * numOfItemsPerRow) - numOfChildren;

    return numOfFillers;
  },

  renderFillers() {
    return _.map(_.range(this.getRequiredNumberOfFillers()), (i) => {
      return <GridFiller key={i} />;
    });
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
        {this.renderFillers()}
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
