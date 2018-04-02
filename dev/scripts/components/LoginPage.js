import React from "react";
import FaIconPack from "react-icons/lib/fa";
import FaGoogle from "react-icons/lib/fa/google";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {},
      userText: ""
    };
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    // console.log("sign In");
    //new instance of a google auth provider
    const provider = new firebase.auth.GoogleAuthProvider();

    //prompts user to select their acconut
    provider.setCustomParameters({
      prompt: "select_account"
    });

    //in this pop up, we are passing the provider
    //the pop up will accept a promise
    //go into authentication on firebase, and enable the provider you plan on using
    firebase

      .auth()
      .signInWithPopup(provider)
      .then(user => {
        // console.log(user);
      });
  }
  signOut() {
    // console.log("sign out");
    firebase.auth().signOut();

    //you can set the state to false explicitly, but componentDidMount watches for the changes in user thus, updating it
  }

  componentDidMount(props) {
    //this will check for a user object which we will call res
    firebase.auth().onAuthStateChanged(res => {
      // console.log(res);
      this.props.loggedInCheck(res);
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      loggedIn: props.loggedIn,
      user: props.user
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loggedIn ? (
          <React.Fragment>
            {/* <h2>Welcome, {this.state.user.displayName}</h2> */}
            <div className="smlButton logOutButton titleButton" onClick={this.signOut}>
              <img src="../../../images/logoutIcon.svg" alt=""/>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="login">
                <p className="logInIntro">
                  sign-in to start collecting!
                </p>
              <button className="lrgButton logInButton" onClick={this.signIn}>
                <FaGoogle className="googleIcon" />
              </button>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default LoginPage;