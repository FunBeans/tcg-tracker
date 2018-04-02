import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import FranchisePage from "./FranchisePage";

class SplashPage extends React.Component {

    render() {
        return (
            <div className="splashPage">
                <div className="splashContentContainer">
                    <div className="appTitle">
                        <div className="logo">
                            <h1><span>the</span>tcg</h1>
                            <div className="logoContainer">
                                <img src="../../../images/Card-blueWhite.png" alt="tcg logo"/>
                            </div>
                        </div>
                        <h3>a trading card game collector</h3>
                    </div>
                    <div className="appEntry">
                        <h4>pick a franchise & start collecting!</h4>
                        <Link to={`/franchises`}><h2>enter <i className="fas fa-caret-right"></i></h2></Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default SplashPage;
