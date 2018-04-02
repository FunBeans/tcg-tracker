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
                <div className="navLogo"><img src="../../../images/Card-blueWhite.png" alt="tcg logo"/></div>
                <Link to="/"><div className="navIcon"><img src="../../../images/homeIcon.svg" alt="home icon" /></div></Link>
                <Link to="/franchises/pokemon"><div className="navIcon"><img src="../../../images/pokeBall.svg" alt="pokemon icon" /></div></Link>
                <Link to="/myDecks"><div className="navIcon"><img src="../../../images/cardDeck.svg" alt="myDeck icon" /></div></Link>
                <div className="navIcon"><img src="" alt="" /></div>
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