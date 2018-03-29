import React from 'react';
import credentials from '../credentials';
import axios from 'axios';
import SingleCard from "./SingleCard";

// This component will query the pokemon API and get all cards in the Basic set
// Display the image for each card in JSX
// eventually: choose which set will be called, and add infinite scroll
// eventually: add ability to filter and sort as child component?

class CardGridPage extends React.Component {
    constructor() {
        super();
        this.state = {
            allCardsInSet: null,
            cardName: [],
            page: null,
            loadedCards: false,
        }

        this.loadCards = this.loadCards.bind(this);
        this.renderSingleCards = this.renderSingleCards.bind(this);
    }

    componentDidMount() {
        this.loadCards();
    }

    loadCards() {
        // create the parameters and headers for axios call
        const url = `${credentials.pokemonApiUrl}/cards`;
        const params = {
            setName: `"Base"`,
        }
        // still trying to make this work
        // https://docs.pokemontcg.io/
        const headers = {
            count: 30,
        }

        // make axio calls to retrive all cards in set
        // want to retrieve first 20 cards??
        axios.get(url, params, headers).then((res) => {
            // for (let i = 0; i < res.data.cards.length; i++){
            //     const cardNames = res.data.cards[i].name;
            //     console.log(cardNames);
            // }
            // console.table(res.data.cards);
            // console.log(res.data.cards[i].name);
            // const defaultBasic = res.data.cards.
            this.setState({
                allCardsInSet: res.data.cards,
                loadedCards: true,
            }) 
        });
    }

    renderSingleCards() {
        // Create a state for loaded cards : true
        // Create a turnary, once it's true we populate it in the render
        // console.log(this.state.allCardsInSet);
        // this.state.allCardsInSet.map((card) => {
        //     // console.log(card);
        //     return <SingleCard />
        // })
    }

    render() {
        // JavaScript Lives here!!
        // console.log(this.state.allCardsInSet);
        // make the dataset (current state) into a variable 
        const cardSet = this.state.allCardsInSet;
        console.log(cardSet);
        return (
            <div>
                <h1>This is the card grid page</h1>
                {
                    // this.state.loadedCards ? console.log('cards are loaded') : console.log('nothing there')
                    this.state.loadedCards ? 
                    cardSet.map(card => {
                       return <SingleCard data={card} key={card.id} />
                        // console.log(card);
                    })
                    // <SingleCard props={this.state.loadedCards}/> 
                    : 
                    <p>No Results</p>
                }
                
            </div>
        )
    }
}

export default CardGridPage;