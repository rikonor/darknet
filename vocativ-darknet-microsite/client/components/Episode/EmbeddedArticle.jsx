EmbeddedArticle = React.createClass({
  render() {
    return (
      <div className="embedded-article">
        <a href={this.props.article.url}>
          <div className="image">
            <img src={this.props.article.imageUrl()}></img>
          </div>
          <div className="category">{this.props.article.category}</div>
          <div className="description">{this.props.article.description}</div>
        </a>
      </div>
    );
  }
});
