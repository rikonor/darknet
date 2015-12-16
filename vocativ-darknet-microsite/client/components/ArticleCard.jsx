ArticleCard = React.createClass({
  render() {
    return (
      <div className="card card-article">
        <a href={this.props.article.url}>
          <Image imageUrl={this.props.article.imageUrl()} />
          <div className="title">{this.props.article.title}</div>
        </a>
      </div>
    );
  }
});
