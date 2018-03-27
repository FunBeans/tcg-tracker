import React from 'react';
import { render } from "react-dom";
import Router from "./components/Router.js"
import NavBar from "./components/NavBar.js"

const Index = props => {
    return (
        <div className="Index">
            <NavBar />
            <Router />
        </div>
    )
};

export default Index;

render(<Index />, document.querySelector("#app"));