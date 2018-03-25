import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import App from "./App";
import CardGrid from "./CardGrid";


const Router = props => {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={CardGrid} />
                </Switch>
            </BrowserRouter>
        )
};

export default Router;
