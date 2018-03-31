import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch, HashRouter, BrowserHistory } from 'react-router-dom';
import FranchisePage from "./FranchisePage";
import SplashPage from "./SplashPage";
import CardGridPage from "./CardGridPage";
import CardDetailPage from "./CardDetailPage";

class Router extends React.Component {
    constructor() {
        super();
        this.state = {
            userLoggedIn: false,
            userObject: {},
        }
    }

    render() {
        return (
            <HashRouter history={BrowserHistory}>
                <div>
                    <Route exact path="/" component={SplashPage} />
                    <Route exact path="/franchises" component={FranchisePage} />
                    <Route exact path="/franchises/pokemon" component={CardGridPage} />
                    <Route exact path="/franchises/pokemon/:cardId" component={CardDetailPage} />
                </div>
            </HashRouter>
        )
    }
};

export default Router;
