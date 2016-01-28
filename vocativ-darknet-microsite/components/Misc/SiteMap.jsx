SiteMap = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let episodesHandle = subsManager.subscribe('episodes');

    return {
      episodesLoading: ! episodesHandle.ready(),
      episodes: Episodes.find({}, {reactive: false}).fetch()
    };
  },

  render() {
    if (this.data.episodeLoading) {
      return <div>Loading</div>;
    }

    let viewableEpisodes = _.filter(this.data.episodes, (ep) => { return ep.isViewable(); });
    let episodesSiteMapEntries = _.map(viewableEpisodes, (ep) => {
      return (
        <div className="site-map-entry" key={ep._id}>
          <a href={"/darknet" + ep.path()}>{ep.title}</a>
        </div>
      );
    });

    return (
      <div className="site-map">
        <div className="header">SITE MAP</div>

        <div className="main-pages">
          <div className="site-map-entry">
            <a href="/darknet">Home</a>
          </div>
        </div>

        <div className="episode-pages">
          {episodesSiteMapEntries}
        </div>

        <div className="link-home">
          <a href="/darknet">Go back to DARK NET</a>
        </div>
      </div>
    );
  }
});
