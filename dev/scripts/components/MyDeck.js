import React from "react";
import NavBar from "./NavBar";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import SingleCard from "./SingleCard";

class MyDeck extends React.Component {
   constructor() {
      super();
      this.state = {
         cardId: "",
         cardInfo: {},
         cardSet: [],
         loadedCards: false,
         user: {}
      }
      this.getCardDeck = this.getCardDeck.bind(this);
   }

   componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
         user
            ? this.setState({ 
                  user: user 
                  }, () => {
                     this.getCardDeck();
                  }
               )
            : null;
      })
   }

   getCardDeck() {
      console.log("get card deck")
      const dbRefUser = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
      dbRefUser.on('value', (snapshot) => {
         const cardArray = [];
         const selectedCard = snapshot.val();
         // snapshot value captures the value of what is added when the function is clicked and pushed to fbDB
         for (let itemKey in selectedCard){
            selectedCard[itemKey].key = itemKey;
            cardArray.push(selectedCard[itemKey])
         }
         this.setState({
            cardSet: cardArray,
            loadedCards: true
         })
      })
   }

   render() {
      const { cardSet } = this.state;
      console.log(cardSet);
      return (
         <React.Fragment>
            <NavBar
               logInUser={this.logInUser}
               googleSignIn={this.googleSignIn}
               signOutUser={this.signOutUser}
            />
            <main className="CardGrid">
                    <div className="wrapper">
                        <h1>This Is Your Deck:</h1>
                        <div className="displayCards">
                            {
                                this.state.loadedCards ? 
                                cardSet.map(card => {
                                    return <Link key={card.cardDetails.id} to={`/franchises/pokemon/${card.cardDetails.id}`}>
                                        <SingleCard data={card.cardDetails.info} key={card.cardDetails.id} />
                                      </Link>;
                                })
                                : 
                                <p>Sign and Build Your Own Deck!</p> 
                            }
                            
                        </div>
                    </div>
                </main>
         </React.Fragment>
      );
   }
};

export default MyDeck;
