import React from "react";
import CardGridPage from "./CardGridPage";
import SingleFranchise from "./SingleFranchise";
import NavBar from "./NavBar.js"

class FranchisePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar logInUser={this.logInUser} googleSignIn={this.googleSignIn} signOutUser={this.signOutUser} />

                <main className="FranchisePage">
                    <section>
                        <div className="wrapper">
                            <div className="franchiseTitle">
                                <h1>Pick a Franchise</h1>
                                <p> Upcoming franchises: Magic:The Gathering, Yu-gi-oh </p>
                            </div>
                                <div className="franchiseGrid">
                                    <SingleFranchise franchiseName="pokemon" image="../../../images/logoPokemon.png" active="active"/>
                                    <SingleFranchise franchiseName="yugioh" image="../../../images/logoYugioh.png" active="inactive"/>
                                    <SingleFranchise franchiseName="magic" image="../../../images/logoMagic.png" active="inactive"/>
                                    <SingleFranchise franchiseName="dragon" image="../../../images/logoDragonball.png" active="inactive"/>
                                </div>
                        </div>
                    </section>
                </main>

            </React.Fragment>
        )
    }
};

export default FranchisePage;
