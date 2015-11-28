EmbeddedArticle = React.createClass({
  render() {
    return (
      <div className="embedded-article">
        <div className="image">
          <a><img src={this.props.article.image}></img></a>
        </div>
        <div className="category">{this.props.article.category}</div>
        <div className="description">{this.props.article.description}</div>
      </div>
    );
  }
});
