import React from "react";
import { BrowserRouter, HashRouter, Route, NavLink, Redirect, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            showLogin: false,
        }
    }

    render() {
        return (
            <nav className="NavBar">
                <p>Nav bar</p>
                <button className="showLoginBtn" onClick={() => this.setState({ showLogin: true })}>Log In</button>
                { this.state.showLogin ? 
                    <LoginPage logInUser={this.props.logInUser} googleSignIn={this.props.googleSignIn} signOutUser={this.props.signOutUser} />
                : null
                }
                
            </nav>
        )
    }
};

export default NavBar;