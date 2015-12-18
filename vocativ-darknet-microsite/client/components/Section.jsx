Section = React.createClass({
  render() {
    let sectionClasses = "section";
    if (this.props.type) sectionClasses += ` ${this.props.type}`;

    return (
      <div className={sectionClasses}>
        {this.props.children}
      </div>
    );
  }
});
