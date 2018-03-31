import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import CardGridPage from "./CardGridPage";

class FranchisePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Pick a Franchise</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus quae corrupti, non delectus iste pariatur deserunt nam rerum nostrum quos illo odio itaque reiciendis mollitia dolores vitae accusantium soluta veniam adipisci illum distinctio? Ad molestias iusto qui quae impedit similique, iure suscipit aspernatur quo ea magnam perferendis dolores explicabo numquam!
                <Link to={`/franchises/pokemon`}>Pokemon</Link>
                </p>

            </React.Fragment>
        )
    }
};

export default FranchisePage;