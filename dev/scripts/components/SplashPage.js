import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import FranchisePage from "./FranchisePage";

class SplashPage extends React.Component {

    render() {
        return (
            <div>
                <h1>This is the Splash</h1>
                <Link to={`/franchises`}>Go to a franchise</Link>
            </div>
        )
    }
};

export default SplashPage;
