import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import CardGridPage from "./CardGridPage";
import NavBar from "./NavBar.js"

class FranchisePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar logInUser={this.logInUser} googleSignIn={this.googleSignIn} signOutUser={this.signOutUser} />
                <div className="wrapper">
                    <h1>Pick a Franchise</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus quae corrupti, non delectus iste pariatur deserunt nam rerum nostrum quos illo odio itaque reiciendis mollitia dolores vitae accusantium soluta veniam adipisci illum distinctio? Ad molestias iusto qui quae impedit similique, iure suscipit aspernatur quo ea magnam perferendis dolores explicabo numquam!
                    <Link to={`/franchises/pokemon`}>Pokemon</Link>
                    </p>
                </div>

            </React.Fragment>
        )
    }
};

export default FranchisePage;
