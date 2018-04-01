import React from "react";
import { BrowserRouter, HashRouter, Route, NavLink, Redirect, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            user: null
        }
        this.loggedInCheck = this.loggedInCheck.bind(this);
    }

    loggedInCheck(res) {
      console.log("res", res);
      if (res) {
         this.setState({
         loggedIn: true,
         user: res
         });
      } else {
         this.setState({
         loggedIn: false,
         user: {}
         });
      }
   }

    render() {
        return (
            <nav className="NavBar">
                <p>Nav bar</p>
                {/* <button className="showLoginBtn" onClick={() => this.setState({ showLogin: true })}>Log In</button> */}
                {/* { this.state.showLogin ? 
                    <LoginPage logInUser={this.props.logInUser} googleSignIn={this.props.googleSignIn} signOutUser={this.props.signOutUser} />
                : null
                } */}
                <LoginPage loggedInCheck={this.loggedInCheck} loggedIn={this.state.loggedIn} User={this.state.user} />
                
            </nav>
        )
    }
};

export default NavBar;