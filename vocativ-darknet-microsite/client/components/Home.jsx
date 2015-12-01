// HomeLayout is the same as MainLayout - with the addition of curtain
HomeLayout = React.createClass({
  getInitialState() {
    return {
      curtainActive: true
    };
  },

  toggleCurtain() {
    setState({curtainActive: ! this.state.curtainActive});
  },

  render() {
    let mainLayoutClasses = classNames({
      'main-layout': true,
      'curtain-on': this.state.curtainActive
    });

    return (
      <div className={mainLayoutClasses}>
        <Nav />
        <Curtain />
        <div className="main-content-container">
          <div className="main-content">
            {this.props.content}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});

Home = React.createClass({
  render() {
    return (
      <div className="home">
        <EpisodesLibrary />
      </div>
    );
  }
});

var Curtain = React.createClass({
  getInitialState() {
    // $(document.body).addClass('under');
    //
    // $(window).on('scroll', function(){
    //     if(window.pageYOffset >= $('.curtain').height()){
    //         $(document.body).removeClass('under');
    //     }
    //     else if(!$(document.body).hasClass('under')){
    //         $(document.body).addClass('under');
    //     }
    // })

    return {
      active: true,
      bgImage: "/images/curtain.jpg"
    };
  },

  render() {
    return (
      <div className="curtain">
        <div className="curtain-image">
          <img src={this.state.bgImage}></img>
        </div>
      </div>
    );
  }
});
