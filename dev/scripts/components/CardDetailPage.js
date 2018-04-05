import React from "react";
import credentials from '../credentials';
import axios from 'axios';
import NavBar from "./NavBar.js"
// import { BrowserHistory } from 'react-router-dom';


class CardDetailPage extends React.Component {
    constructor() {
        super();
        this.state = {
            cardId: '',
            cardInfo: {},
            cardCollection: [],
            user: undefined,
            inCollection: false,
            card: [],
            loggedIn: false
        }

        this.getCardInfo = this.getCardInfo.bind(this);
        this.addToDeck = this.addToDeck.bind(this);
        this.collectionCheck = this.collectionCheck.bind(this);
        this.removeFromDeck = this.removeFromDeck.bind(this);
        this.loadCollection = this.loadCollection.bind(this);
    }

   componentDidMount() {
      // console.log(this.props.match.params.cardId);
      //have user's firebase information logged in state
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ user: user }, () => this.loadCollection());
      });
      console.log(this.state.user);
      
      // const dbRefUser = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
      // dbRefUser.on('value', (snapshot) => {
      //    const cardArray = [];
      //    const selectedCard = snapshot.val();
      //    // snapshot value captures the value of what is added when the function is clicked and pushed to fbDB
      //    for (let itemKey in selectedCard){
      //       selectedCard[itemKey].key = itemKey;
      //       cardArray.push(selectedCard[itemKey])
      //    }
      //    this.setState({
      //       cardCollection: cardArray,
      //       cardId : this.props.match.params.cardId
      //    },
      //    () => {
      //          // wait until state is set before making axios call
      //          this.getCardInfo()
      //    })
      // })
   }

   loadCollection() {
      console.log(this.state.user)
      if (this.state.user === null) {
         this.setState({
            loggedIn: false
         })
         this.render();
      } else if (this.state.user !== undefined) {
         this.setState({
            loggedIn: true
         })
         console.log("loading");

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
               cardCollection: cardArray,
               cardId : this.props.match.params.cardId
            },
            () => {
                  // wait until state is set before making axios call
                  this.getCardInfo()
            })
         })
      } 
   }

   getCardInfo() {
      axios
        .get(`${credentials.pokemonApiUrl}/cards/${this.state.cardId}`)
        .then(res => {
          this.setState({ cardInfo: res.data.card },
            () => {this.collectionCheck()});
        }); 
   }

   collectionCheck() {
      // console.log("checked");
      const deck = this.state.cardCollection;
      const thisCard = this.state.cardInfo;
      // console.log(deck, thisCard);
      const duplicateCard = deck.find((item) => thisCard.id === item.cardDetails.id);
      // console.log(duplicateCard);
      if (duplicateCard === undefined) {
         this.setState({
            inCollection: false
         })
      } else {
         this.setState({
            inCollection: true
         })
      }
   }

   removeFromDeck() {
      // console.log(this.state.cardId);
      // let removeId = this.state.cardId;
      // console.log(removeId);
      console.log("remove Card");
      // // this.setState({
      // //    recipeIndex: undefined
      // // })
      // firebase.database().ref(`users/${firebase.auth().currentUser.uid}/cardDetails/${removeId}`).remove();
      let deck = this.state.cardCollection;
      let thisCard = this.state.cardInfo;
      let duplicateCard = deck.find(item => thisCard.id === item.cardDetails.id);
      console.log(duplicateCard);
      let removeId = duplicateCard.key;
      console.log(removeId);
      firebase.database().ref(`users/${firebase.auth().currentUser.uid}/${removeId}`).remove();
      // if (duplicateCard) {
      //    //   this.setState({ inCollection: false });
      //    console.log(duplicateCard);
      //    let removeId = duplicateCard.key;
      //    console.log(removeId);
      //    console.log("remove Card");
      //    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/${removeId}`).remove();
      // } else {
      //    null
      // }
      this.setState({ inCollection: false })
   }


   addToDeck() {
      // console.log("clicked")
      // console.log(this.state.cardInfo)
      const dbRefUser = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
      // console.log(dbRefUser);
      // console.log(this.state.cardInfo)
      
    //We want to check if the card already exists in firebase so it doesn't add again
    //Check the value of the current database

      const cardDetails = {
         id: this.state.cardInfo.id,
         info: this.state.cardInfo
      }

      dbRefUser.on('value', (snapshot) => {
         const cardArray = [];
         const selectedCard = snapshot.val();
         // snapshot value captures the value of what is added when the function is clicked and pushed to fbDB
         for (let itemKey in selectedCard){
               selectedCard[itemKey].key = itemKey;
               cardArray.push(selectedCard[itemKey])
               // console.log(cardArray);
         }
         // creatinga a new array from the cardArray, here we are testing the existing array with filter to see if this card already exists in our database
         // grabbing the cardName from cardDetails and checking to see if there is a match
         const testArray = cardArray.find(card => card.cardDetails.id === cardDetails.id);

         if (testArray === undefined){
               console.log("no match");
               dbRefUser
               .push({
               //  cardInfo: this.state.cardInfo
               // cardId: this.state.cardId
               cardDetails
               })
               this.setState({ inCollection: true });   
         }
         else {
               console.log("matched");
         }
      })
   }

    render() {     
        const { ability, attacks, hp, name, types, weaknesses, imageUrl, rarity, supertype, text, nationalPokedexNumber } = this.props.location.state.card;
        return <React.Fragment>
            <NavBar logInUser={this.logInUser} googleSignIn={this.googleSignIn} signOutUser={this.signOutUser} />
            <div className="wrapper">
               <main className="cardDetails">
                  <aside className="detailsImg">
                     <div className="mobileHeader">
                        <h2>
                           {name}
                           <span>{supertype}</span>
                        </h2>
                     </div>
                     <img src={imageUrl} alt={`a picture of ${name}`} />
                  </aside>

                  <section className="detailsContent">
                     <div className="detailsContainer">
                        <h2 className="header">
                           {name}
                        </h2>
                        {
                           supertype === "Pokémon" ? <h2>
                              HP{hp}
                              <div className="typeHolder">
                              <img src={`../../../images/${types}.png`} alt={`an emblem of the type ${types}`} />
                              </div>
                           </h2> : null
                        }
                     </div>

                     {
                        supertype === "Pokémon" ? attacks.map(
                           (attack, i) => {
                           return (
                              <React.Fragment>
                                 <div className="attackContainer">
                                    <div
                                       className="detailsContainer"
                                       key={i}
                                    >
                                       <h3>{attack.name}</h3>
                                       <h2>
                                          <span>{attack.damage}</span>
                                       </h2>
                                    </div>
                                    <div className="detailsContainer">
                                       <p>{attack.text}</p>
                                    </div>
                                    <div className="details">
                                       <h3>Cost</h3>
                                       <div className="costContainer">
                                          {attack.cost
                                          ? attack.cost.map((cost, i) => {
                                                return (
                                                <div
                                                   className="typeHolder"
                                                   key={i}
                                                >
                                                   <img
                                                      src={`../../../images/${cost}.png`}
                                                      alt={`an emblem of the type ${types}`}
                                                   />
                                                </div>
                                                );
                                             })
                                          : null}
                                       </div>
                                    </div>
                                 </div>
                              </React.Fragment>
                           );
                           }
                        ) : null
                     }
                     
                     {
                        supertype === "Pokémon"
                           ?  <div className="details">
                                 <h3>Pokedex Number</h3>
                                 <span>{nationalPokedexNumber}</span>
                              </div>
                           : null
                     }

                     {
                        supertype === "Trainer" 
                        ?  <div className="detailsContainer">
                              <p>{text}</p>
                           </div> 
                        : null
                     }

                     <div className="details">
                        <h3>rarity</h3>
                        <span>{rarity}</span>
                     </div>

                     {/* <div className="detailsContainer">
                        {
                           this.state.inCollection
                           ?  <button className="addButton" onClick={this.removeFromDeck}>
                                 Remove
                              </button>
                        
                           :  <button className="addButton" onClick={this.addToDeck}>
                                 Add to Deck
                              </button>
                        } 
                     </div> */}
                     {
                        this.state.loggedIn
                        ?
                           <div className="detailsContainer">
                              {
                                 this.state.inCollection
                                 ?  <button className="addButton" onClick={this.removeFromDeck}>
                                       Remove
                                    </button>
                              
                                 :  <button className="addButton" onClick={this.addToDeck}>
                                       Add to Deck
                                    </button>
                              } 
                           </div> 
                        :
                           null
                     }
                  </section>
               </main>
            </div>
          </React.Fragment>;
    }
};

export default CardDetailPage;
