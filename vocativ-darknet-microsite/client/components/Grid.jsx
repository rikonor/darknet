Grid = React.createClass({
  numOfItemsPerRow(numOfChildren) {
    // How many items appear on each row should be based on the amount of children
    // Unless this is overriden by the itemsPerRow property
    let itemsPerRow = this.props.itemsPerRow;

    // Allowed values are [2, 3]
    if (itemsPerRow && [2, 3].includes(itemsPerRow)) {
      return itemsPerRow;
    }

    // If it's just 1, then 1 per row
    if ([1].includes(numOfChildren)) {
      return 1;
    }

    // If there are 2 or 4, then 2 per row
    if ([2, 4].includes(numOfChildren)) {
      return 2;
    }

    // Otherwise -> 3 per row
    return 3;
  },

  numOfChildrenToClass() {
    let numOfChildren = React.Children.count(this.props.children);
    let numOfItemsPerRow = this.numOfItemsPerRow(numOfChildren);

    console.log("1", numOfChildren, numOfItemsPerRow);

    switch(numOfItemsPerRow) {
      case 1:
        return 'one-per-row';
      case 2:
        return 'two-per-row';
      default:
        return 'three-per-row';
    }
  },

  getRequiredNumberOfFillers() {
    let numOfChildren = React.Children.count(this.props.children);
    let numOfItemsPerRow = this.numOfItemsPerRow(numOfChildren);

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
    let gridClasses = "grid";
    gridClasses += ` ${this.numOfChildrenToClass()}`;

    // Grid Children should only be GridItems
    return (
      <div className={gridClasses}>
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
