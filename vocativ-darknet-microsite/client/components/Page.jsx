Page = React.createClass({
  render() {
    return (
      <div className="page">
        {this.props.children}

        <NavArrow />
      </div>
    );
  }
});

/*
  NavArrow

  A fixed arrow assisting with navigating to next sections on the page
  as well as navigate to the next page when end of current page reached
*/
var NavArrow = React.createClass({
  componentDidMount() {
    this.scrollData = {};

    // Constants
    this.scrollData.DURATION = 2000;
    this.scrollData.EASING = "ease";

    let navHeight = $(".nav-container").height();
    let mainContentPadding = Number.parseInt($(".main-content").css("padding-top"));
    this.scrollData.topOffset = (-1) * (navHeight + mainContentPadding);
  },

  componentWillUnmount: function() {
    this.detechScrollHandler();
  },

  attachScrollHandler() {
    window.addEventListener('wheel', this.cancelScroll);
  },

  detechScrollHandler() {
    window.removeEventListener('wheel', this.cancelScroll);
  },

  cancelScroll() {
    let currTarget = this.state.currTarget;

    if (currTarget) {
      currTarget.velocity("stop");
    }

    this.detechScrollHandler();
  },

  scrollTo(target) {
    this.setState({currTarget: target});

    target
      .velocity("stop")
      .velocity("scroll", {
        duration: this.scrollData.DURATION,
        easing: this.scrollData.EASING,
        offset: this.scrollData.topOffset,
        complete: this.detechScrollHandler
      });

    this.attachScrollHandler();
  },

  scrollToNextSection() {
    let targets = $(".section");
    let currentScroll = $(document).scrollTop();

    let nextTarget = _.find(targets, (t) => {
      let targetScrollPosition = $(t).offset().top;
      return currentScroll < (targetScrollPosition + this.scrollData.topOffset);
    });

    // Convert to jQuery object
    nextTarget = $(nextTarget);

    this.scrollTo(nextTarget);
  },

  handleClick() {
    this.scrollToNextSection();
  },

  render() {
    return (
      <div className="nav-arrow" onClick={this.handleClick}>
        <i className="fa fa-angle-double-down"></i>
      </div>
    );
  }
});