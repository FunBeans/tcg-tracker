import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import App from "./App";
import CardGrid from "./CardGrid";


const SingleCard = props => {
    return (
        <div className="SingleCard">
            <p>This is a single card</p>
        </div>
    )
};

export default SingleCard;