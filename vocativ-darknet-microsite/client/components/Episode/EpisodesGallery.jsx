var LEFT = false;
var RIGHT = true;

EpisodesGallery = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let episodesHandle = Meteor.subscribe('episodes');

    return {
      episodesLoading: ! episodesHandle.ready(),
      episodes: Episodes.find().fetch()
    };
  },

  scroll(dir) {
    var SPEED = 0.4;
    var EASING = "ease";

    var scrollParent = $(this.refs.episodes);
    var targetColl = scrollParent.find(".gallery-episode");
    var tFirst = targetColl.first();
    var tLast = targetColl.last();

    var currTarget = (dir === LEFT) ? tFirst : tLast;
    this.setState({currTarget: currTarget});

    // Need to get a single speed so the distance from your target should
    // decide the duration (duration = speed)
    var scrollParentWidth = scrollParent.width();
    var targetWidth = tFirst.width();
    var tFirstDist = Math.abs(tFirst.position().left);
    var tLastDist  = Math.abs(tLast.position().left);

    // Assuming constant speed let's find the duration and offset to feed `velocity`
    // This is just a simple `x = v * t` calculation
    var DURATION = (dir === LEFT) ? (tFirstDist / SPEED) : ((tLastDist + targetWidth - scrollParentWidth) / SPEED);
    // Sorry for the magic number (24) - it's the right padding for the .gallery-episode elements
    var currOffset = ((dir === LEFT) ? 0 : (-scrollParentWidth + targetWidth + 24)) + "px";

    // Scrolling with Velocity (instead of jQuery.animate)
    currTarget
      .velocity("stop")
      .velocity("scroll", {
        axis: "x",
        container: scrollParent,
        duration: DURATION,
        offset: currOffset,
        easing: EASING
      });
  },

  scrollStop() {
    this.state.currTarget.velocity("stop");
  },

  renderEpisodes() {
    this.data.episodes = mockEpisodes(this.data.episodes[0]);

    return this.data.episodes.map((episode) => {
      return <GalleryEpisode key={episode._id} episode={episode} />;
    });
  },

  render() {
    if (this.data.episodesLoading) {
      return <div>Loading</div>;
    }

    return (
      <div className="episodes-mini-gallery">
        <div className="scroll left" onMouseEnter={this.scroll.bind(this, LEFT)} onMouseLeave={this.scrollStop}><i className="fa fa-angle-left"></i></div>
        <div className="scroll right" onMouseEnter={this.scroll.bind(this, RIGHT)} onMouseLeave={this.scrollStop}><i className="fa fa-angle-right"></i></div>

        <div className="episodes" ref="episodes">
          {this.renderEpisodes()}
        </div>
      </div>
    );
  }
});

var GalleryEpisode = React.createClass({
  getEpisodePath() {
    let pathBase = "/episodes";
    return pathBase + "/" + this.props.episode.number;
  },

  render() {
    return (
      <div className="gallery-episode">
        <div className="image">
          <img src={this.props.episode.image}></img>
        </div>
        <div className="name"><a href={this.getEpisodePath()}>{this.props.episode.number}. {this.props.episode.name}</a></div>
      </div>
    );
  }
});
