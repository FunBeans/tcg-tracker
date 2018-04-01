import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import FranchisePage from "./FranchisePage";

class SplashPage extends React.Component {

    render() {
        return (
            <div className="splashPage">
                <div className="logo">
                    <h1><span>the</span>tcg</h1>
                    <div className="logoContainer">
                        <img src="../../../images/Card-blueWhite.png" alt="tcg logo"/>
                    </div>
                </div>
                <h2>a trading card game collector</h2>
                <h3>pick a franchise & start colelcting!</h3>
                <Link to={`/franchises`}>enter</Link>
            </div>
        )
    }
};

export default SplashPage;
