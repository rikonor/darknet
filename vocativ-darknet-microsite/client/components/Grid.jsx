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

  widthOfChildren() {
    // You can force the width each child will take
    // with the widthOfChildren property

    let widthOfChildren = this.props.widthOfChildren;
    let itemsPerRow = this.numOfItemsPerRow();

    if (! widthOfChildren) {
      return 1;
    }

    // If itemsPerRow doesn't divide widthOfChildren
    // then each child should be one column wide
    if (itemsPerRow % widthOfChildren !== 0) {
      console.log(`Grid item can't be ${widthOfChildren} columns wide when a row contains ${itemsPerRow} items. Defaulting to 1.`);
      return 1;
    }

    // Only allowed values are 1, 2, 3
    if ([1, 2, 3].includes(widthOfChildren)) {
      return widthOfChildren;
    }

    // By default each child should be one column wide
    return 1;
  },

  numOfChildrenToClass() {
    let numOfChildren = React.Children.count(this.props.children);
    let numOfItemsPerRow = this.numOfItemsPerRow(numOfChildren);

    switch(numOfItemsPerRow) {
      case 1:
        return 'one-per-row';
      case 2:
        return 'two-per-row';
      default:
        return 'three-per-row';
    }
  },

  widthOfChildrenToClass() {
    let widthOfChildren = this.widthOfChildren();

    switch(widthOfChildren) {
      case 1:
        return 'one-column';
      case 2:
        return 'two-column';
      case 3:
        return 'three-column';
    }
  },

  getRequiredNumberOfFillers() {
    let numOfChildren = React.Children.count(this.props.children);
    let numOfItemsPerRow = this.numOfItemsPerRow(numOfChildren);
    let widthOfChildren = this.widthOfChildren();

    // Get number of required fillers based on how many items will be missing
    // from a full grid
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
