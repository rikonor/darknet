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
  // Init

  componentDidMount() {
    this.scrollData = {};

    // Constants
    this.scrollData.DURATION = 2000;
    this.scrollData.EASING = "ease";

    let navHeight = $(".nav-container").height();
    let mainContentPadding = Number.parseInt($(".main-content").css("padding-top"));
    this.scrollData.topOffset = (-1) * (navHeight + mainContentPadding);

    // Need a reference to the throttled function
    this.scrollData.funcRefs = { updateArrowState: _.throttle(this.updateArrowState, 100) };
    window.addEventListener('scroll', this.scrollData.funcRefs.updateArrowState);

    // Init component state
    this.setState({arrowState: "down"});
  },

  componentWillUnmount: function() {
    // Remove all the event handlers we created
    this.detechScrollHandler();
    window.removeEventListener('scroll', this.scrollData.funcRefs.updateArrowState);
  },

  attachScrollHandler() {
    window.addEventListener('wheel', this.cancelScroll);
  },

  detechScrollHandler() {
    window.removeEventListener('wheel', this.cancelScroll);
  },

  // Scroll Commands

  cancelScroll() {
    let currTarget = this.state.currTarget;

    if (currTarget) {
      currTarget.velocity("stop");
    }

    this.detechScrollHandler();
  },

  scrollTo(target, customOffset) {
    this.setState({currTarget: target});

    target
      .velocity("stop")
      .velocity("scroll", {
        duration: this.scrollData.DURATION,
        easing: this.scrollData.EASING,
        offset: customOffset || this.scrollData.topOffset,
        complete: this.detechScrollHandler
      });

    this.attachScrollHandler();
  },

  scrollToBottom() {
    let nextTarget = $(".footer-container");

    // Calculate offset from the bottom
    let footerHeight = $(".footer-container").height();
    let screenHeight = $(window).height();
    let bottomOffset = (-1) * (screenHeight - footerHeight);

    this.scrollTo(nextTarget, bottomOffset);
  },

  scrollToTop() {
    let nextTarget = $(".page");

    this.scrollTo(nextTarget);
  },

  scrollToNextSection() {
    let targets = $(".section");
    let currentScroll = $(document).scrollTop();

    let nextTarget = _.find(targets, (t) => {
      let targetScrollPosition = $(t).offset().top;
      return currentScroll < (targetScrollPosition + this.scrollData.topOffset);
    });

    if (!nextTarget)
      return this.scrollToBottom();

    // Convert to jQuery object
    nextTarget = $(nextTarget);

    this.scrollTo(nextTarget);
  },

  handleClick() {
    if (this.state.arrowState === "down")
      return this.scrollToNextSection();

    if (this.state.arrowState === "up")
      return this.scrollToTop();

    // if (this.state.arrowState === "right")
    //   return this.goTo();
  },

  // Arrow direction and location (fixed/absolute)

  changeStateRight() {
    this.setState({arrowState: "right"});
    $(".nav-arrow").addClass("right").removeClass("down up");
  },

  changeStateDown() {
    this.setState({arrowState: "down"});
    $(".nav-arrow").addClass("down").removeClass("up right");
  },

  changeStateUp() {
    this.setState({arrowState: "up"});
    $(".nav-arrow").addClass("up").removeClass("down right");
  },

  updateArrowState() {
    // Check if the footer is reached
    let footer = $(".footer-container");
    if (isElementInView(footer)) {
      return this.changeStateUp();
    } else {
      return this.changeStateDown();
    }
  },

  render() {
    return (
      <div className="nav-arrow" onClick={this.handleClick}>
        <i className="fa fa-angle-double-down"></i>
      </div>
    );
  }
});
