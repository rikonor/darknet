const LEFT = false;
const RIGHT = true;

EpisodesGalleryLoader = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let episodesHandle = Meteor.subscribe('episodes');

    return {
      episodesLoading: ! episodesHandle.ready(),
      episodes: Episodes.find().fetch()
    };
  },

  render() {
    if (this.data.episodesLoading) {
      return <div>Loading</div>;
    }

    // Make some more episodes
    // this.data.episodes = mockEpisodes(this.data.episodes[0]);

    return <EpisodesGallery episodes={this.data.episodes} />;
  }
});

EpisodesGallery = React.createClass({
  initScrollData() {
    this.scrollData = {};

    this.scrollData.SPEED = 0.4;
    this.scrollData.EASING = "ease";

    this.scrollData.scrollParent = $(this.refs.episodes);
    this.scrollData.targetColl = this.scrollData.scrollParent.find(".gallery-episode");
    this.scrollData.tFirst = this.scrollData.targetColl.first();
    this.scrollData.tLast = this.scrollData.targetColl.last();

    // Need to get a single speed so the distance from your target should
    // decide the duration (duration = speed)
    this.scrollData.scrollParentWidth = this.scrollData.scrollParent.width();
    this.scrollData.targetWidth = this.scrollData.tFirst.width();
  },

  componentDidMount() {
    this.initScrollData();

    // Need a reference to the throttled function
    this.scrollData.funcRefs = { updateGalleryState: _.throttle(this.updateGalleryState, 250) };
    window.addEventListener('scroll', this.scrollData.funcRefs.updateGalleryState);
  },

  scroll(dir) {
    var currTarget = (dir === LEFT) ? this.scrollData.tFirst : this.scrollData.tLast;
    this.setState({currTarget: currTarget});

    let tFirstDist = Math.abs(this.scrollData.tFirst.position().left);
    let tLastDist  = Math.abs(this.scrollData.tLast.position().left);

    // Assuming constant speed let's find the duration and offset to feed `velocity`
    // This is just a simple `x = v * t` calculation
    const DURATION = (dir === LEFT) ? (tFirstDist / this.scrollData.SPEED) : ((tLastDist + this.scrollData.targetWidth - this.scrollData.scrollParentWidth) / this.scrollData.SPEED);
    // Sorry for the magic number (24) - it's the right padding for the .gallery-episode elements
    var currOffset = ((dir === LEFT) ? 0 : (-this.scrollData.scrollParentWidth + this.scrollData.targetWidth + 24)) + "px";

    // Scrolling with Velocity (instead of jQuery.animate)
    currTarget
      .velocity("stop")
      .velocity("scroll", {
        axis: "x",
        container: this.scrollData.scrollParent,
        duration: DURATION,
        offset: currOffset,
        easing: this.scrollData.EASING
      });
  },

  scrollStop() {
    this.state.currTarget.velocity("stop");
  },

  changeStateNonFixed() {
    $(".episodes-mini-gallery").addClass("non-fixed");
  },

  changeStateFixed() {
    $(".episodes-mini-gallery").removeClass("non-fixed");
  },

  updateGalleryState() {
    // Check if the footer is reached
    let footer = $(".footer-container");
    if (isElementInView(footer)) {
      return this.changeStateNonFixed();
    } else {
      return this.changeStateFixed();
    }
  },

  renderEpisodes() {
    return this.props.episodes.map((episode) => {
      return <GalleryEpisode key={episode._id} episode={episode} />;
    });
  },

  render() {
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
