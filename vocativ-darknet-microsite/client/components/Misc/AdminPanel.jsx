AdminPanel = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      user: Meteor.user()
    };
  },

  render() {
    let loggedIn = !! this.data.user;

    if (! loggedIn) {
      return <AdminLogin />;
    }
    else {
      return <AdminView user={this.data.user} />;
    }
  }
});

var AdminView = React.createClass({
  logout() {
    Meteor.logout();
  },

  render() {
    return (
      <div className="admin-view">
        <p className="main-header">Hey, {this.props.user.emails[0].address}</p>
        <p className="subheader">You are logged in as admin and can view all hidden content.</p>

        <div className="admin-logout">
          <p className="logout-notice">Logout to view the site as a normal user.</p>
          <button className="logout-btn" onClick={this.logout}>Logout</button>
        </div>
      </div>
    );
  }
});

var AdminLogin = React.createClass({
  login(event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    event.target.reset();

    Meteor.loginWithPassword(email, password);
  },

  render() {
    return (
      <div className="admin-login">
        <div className="main-header">Login as admin to view hidden content</div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.login}>
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button className="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
});
