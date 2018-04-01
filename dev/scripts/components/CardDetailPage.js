import React from "react";
import credentials from '../credentials';
import axios from 'axios';
// import { BrowserHistory } from 'react-router-dom';


class CardDetailPage extends React.Component {
    constructor() {
        super();
        this.state = {
            cardId: '',
            cardInfo: {},
        }

        this.getCardInfo = this.getCardInfo.bind(this);
        this.addToDeck = this.addToDeck.bind(this);
    }

    componentDidMount() {
        console.log(this.props.match.params.cardId);
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
      // dbRefUser
      // .push({
      //    start: this.props.location.state.firstChoice,
      //    end: this.props.location.state.endChoice,
      //    startTime: this.state.startTime
      // })
      // .then((data) => {
      //    const dbRefPublic = firebase.database().ref(`/public/${data.ref.key}`);
      //    console.log(dbRefPublic);
      //    dbRefPublic.update({
      //       start: this.props.location.state.firstChoice,
      //       end: this.props.location.state.endChoice,
      //       startTime: this.state.startTime
      //    });
      // });
    }

    render() {     
        const { ability, attacks, hp, name, types, weaknesses, imageUrl, rarity, supertype, text } = this.state.cardInfo;
        console.log(attacks)
        return (
            <React.Fragment>
               <p>Card detail page</p>
               {/* <a href="" onClick={this.props.history.goBack}>ihihih</a> */}

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

                     <p>{text}</p>

                     <h3>
                        {`rarity: "${rarity}"`}
                     </h3>

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

                     <button onClick={this.addToDeck}>Add to Deck</button>


                  </section>
               </main>
            </React.Fragment>
        )
    }
};

export default CardDetailPage;
