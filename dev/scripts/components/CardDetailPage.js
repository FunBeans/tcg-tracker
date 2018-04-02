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
            user: {}
        }

        this.getCardInfo = this.getCardInfo.bind(this);
        this.addToDeck = this.addToDeck.bind(this);
    }

    componentDidMount() {
      console.log(this.props.match.params.cardId);
      //have user's firebase information logged in state
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ user: user });
      });
      //connect to user's firebase
      const dbref = firebase
        .database()
        .ref(`users/${this.state.user.uid}`);
    //   dbref.on("value", snapshot => {
    //      console.log(snapshot.val());
    //   //    const data = snapshot.val();
    //   //    const state = [];
    //   //    for (let key in data) {
    //   //    data[key].key = key;
    //   //    state.push(data[key]);
    //   //    }
    //   //    console.log(state);
    //   //    this.setState({ recipes: state });
    //   });
      this.setState({ cardId : this.props.match.params.cardId },
         () => {
               // wait until state is set before making axios call
               this.getCardInfo()
         }
      )
    }

    getCardInfo() {
        axios.get(`${credentials.pokemonApiUrl}/cards/${this.state.cardId}`)
            .then((res) => {
                this.setState({ cardInfo: res.data.card },() => this.render());
            });
    }

    addToDeck() {
      console.log("clicked")
      console.log(this.state.cardInfo)
      const dbRefUser = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
      console.log(dbRefUser);
      console.log(this.state.cardInfo)
      
    //We want to check if the card already exists in firebase so it doesn't add again
    //Check the value of the current database

    const cardDetails = {
        id: this.state.cardInfo.id,
        info: this.state.cardInfo
    }
    console.log(cardDetails);

    dbRefUser.on('value', (snapshot) => {
        const cardArray = [];
        const selectedCard = snapshot.val();
        // snapshot value captures the value of what is added when the function is clicked and pushed to fbDB
        for (let itemKey in selectedCard){
            selectedCard[itemKey].key = itemKey;
            cardArray.push(selectedCard[itemKey])
            console.log(cardArray);
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
        }
        else {
            console.log("matched");
        }
    })
    


      // const duplicateRecipe = this.state.recipes.find((item) => recipeData.url === item.url);
      // if (duplicateRecipe === undefined) {
      //    //then set state
      //    recipeState.push(recipeData);
      //    this.setState({
      //       recipes: recipeState
      //    })
      //    //update firebase
      //    const dbref = firebase.database().ref("/recipes");
      //    dbref.push(recipeData);
      // } else {
      //    console.log("error")
      // }

      // if we want to put in a public database
      // .then((data) => {
      //    const dbRefPublic = firebase.database().ref(`/public/${data.ref.key}`);
      //    console.log(dbRefPublic);
      //    dbRefPublic.update({
      //       start: this.props.location.state.firstChoice,
      //       end: this.props.location.state.endChoice,
      //       startTime: this.state.startTime
      //    });
      // });
      console.log("card added")
    }

    render() {     
        const { ability, attacks, hp, name, types, weaknesses, imageUrl, rarity, supertype, text } = this.state.cardInfo;
        console.log(attacks)
        return (
            <React.Fragment>
            <NavBar logInUser={this.logInUser} googleSignIn={this.googleSignIn} signOutUser={this.signOutUser} />
               <p>Card detail page</p>

               <main className="cardDetails">

                  <aside className="detailsImg">
                     <img src={imageUrl} alt={`a picture of ${name}`}/>
                  </aside>

                  <section className="detailsContent">
                  
                     <div className="detailsContainer">
                        <h2>
                           {name}
                           <span>
                              {supertype}
                           </span>
                        </h2>
                        {
                           supertype === "Pokémon" 
                           ?  <h2>
                                 HP{hp}
                                 <img src={`../../../images/${types}.png`} alt={`an emblem of the type ${types}`} />
                              </h2>
                           : null
                        }  
                     </div>
                     
                     {/* text if it is a trainer/item card */}
                     <p>{text}</p>

                     {
                        attacks
                        ? attacks.map((attack, i) => {

                           return   <React.Fragment key={i}>
                                       <h2>
                                          {attack.name}
                                          {
                                             attack.cost 
                                             ? attack.cost.map((cost,i) => {
                                                return <img key={i} src={`../../../images/${cost}.png`} alt={`an emblem of the type ${types}`}/>
                                             })
                                             :null
                                          }
                                       </h2>
                                       <p>{attack.text}</p>
                                    </React.Fragment>;
                        })
                        : null
                     }

                     <h3>
                        {`rarity: "${rarity}"`}
                     </h3>

                     <button onClick={this.addToDeck}>Add to Deck</button>


                  </section>
               </main>
            </React.Fragment>
        )
    }
};

export default CardDetailPage;
