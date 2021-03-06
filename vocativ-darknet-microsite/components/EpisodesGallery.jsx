const LEFT = false;
const RIGHT = true;

EpisodesGalleryLoader = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let episodesHandle = subsManager.subscribe('episodes');

    return {
      episodesLoading: ! episodesHandle.ready(),
      episodes: Episodes.find({}, {sort: {airingAt: 1}, reactive: false}).fetch()
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
  getInitialState() {
    return {
      widerThenChildren: false
    };
  },

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

  checkDisabledScrollArrows() {
    // If the screen is so wide that all gallery elements fit without
    // the need for scrolling, then don't show the scroll arrows
    this.setState({widerThenChildren: this.scrollData.tLast.position().left + this.scrollData.tLast.width() < this.scrollData.scrollParent.width()});
  },

  componentDidMount() {
    this.initScrollData();

    // Need a reference to the throttled function
    this.scrollData.funcRefs = { updateGalleryState: _.throttle(this.updateGalleryState, 100) };
    window.addEventListener('scroll', this.scrollData.funcRefs.updateGalleryState);

    // Is screen wide? should hide scroll arrows?
    this.checkDisabledScrollArrows();
    window.addEventListener('resize', this.checkDisabledScrollArrows);
    window.addEventListener('resize', this.initScrollData);
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
    let scrollClasses = "scroll";
    if (this.state.widerThenChildren) {
      scrollClasses += " hidden";
    }

    let episodesClasses = "episodes";
    if (this.state.widerThenChildren) {
      episodesClasses += " centered";
    }

    return (
      <div className="episodes-mini-gallery">
        <div className={scrollClasses + " left"} onMouseEnter={this.scroll.bind(this, LEFT)} onMouseLeave={this.scrollStop}><i className="fa fa-angle-left"></i></div>
        <div className={scrollClasses + " right"} onMouseEnter={this.scroll.bind(this, RIGHT)} onMouseLeave={this.scrollStop}><i className="fa fa-angle-right"></i></div>

        <div className={episodesClasses} ref="episodes">
          {this.renderEpisodes()}
        </div>
      </div>
    );
  }
});

var GalleryEpisode = React.createClass({
  trackClick() {
    GAnalytics.event("Navigation", "Episode Carousel on EP", this.props.episode.title);
  },

  handleClick() {
    this.trackClick();

    // When navigating to a new episode the plugin router-autoscroll will autoscroll to the top
    // But when clicking the episode you're already on - we still want to scroll to the top
    // So we have to do this manually (because there's no path change)
    $("body").velocity("scroll");
  },

  render() {
    let galleryEpisodeClasses = 'gallery-episode';
    if (! this.props.episode.isViewable()) galleryEpisodeClasses += ' coming-soon';

    let linkClassModifier = 'episode-link';
    if (! this.props.episode.isViewable()) linkClassModifier += ' coming-soon';

    return (
      <div className={galleryEpisodeClasses}>
        <a className={linkClassModifier} href={"/darknet" + this.props.episode.path()} onClick={this.handleClick}>
          <div className="image">
            <img src={this.props.episode.imageUrl()}></img>
            <div className="coming-soon-text"><span>COMING SOON</span></div>
          </div>
          <div className="name">{this.props.episode.title}</div>
        </a>
      </div>
    );
  }
});
