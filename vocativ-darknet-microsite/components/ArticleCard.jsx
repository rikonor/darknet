ArticleCard = React.createClass({
  handleClick() {
    GAnalytics.event("Articles", "view", this.props.article.title);
  },

  render() {
    return (
      <div className="card card-article">
        <a href={this.props.article.url} target="_blank" onClick={this.handleClick}>
          <Image imageUrl={this.props.article.imageUrl()} />
          <div className="title">{this.props.article.title}</div>
        </a>
      </div>
    );
  }
});
