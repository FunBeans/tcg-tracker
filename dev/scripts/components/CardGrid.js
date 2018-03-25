import React from 'react';
import credentials from '../credentials';
import axios from 'axios';
import SingleCard from "./SingleCard";

// This component will query the pokemon API and get all cards in the Basic set
// Display the image for each card in JSX
// eventually: choose which set will be called, and add infinite scroll
// eventually: add ability to filter and sort as child component?

class CardGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            allCardsInSet: null,
            page: null,
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
            this.setState({
                allCardsInSet: res.data.cards
            }) 
        });
    }

    renderSingleCards() {
        console.log(this.state.allCardsInSet);
        this.state.allCardsInSet.map((card) => {
            console.log(card.name);
            return <SingleCard />
        })
    }

    render() {
        return (
            <div className="CardGrid">
                {/* if there are cards in state, render them. If there are no cards in there, say there are no cards */}
                {this.state.allCardsInSet ? this.renderSingleCards() : <p>there are no cards in state</p>}
                
            </div>
        )
    }
}

export default CardGrid;