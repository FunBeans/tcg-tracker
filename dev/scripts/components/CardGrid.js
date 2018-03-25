import React from 'react';
import credentials from '../credentials';
import axios from 'axios';

// This component will query the pokemon API and get 30 cards in the Basic set
// Display the image for each card in JSX
// eventually: choose which set will be called, and add infinite scroll
// eventually: add ability to filter and sort as child component?

class CardGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            set: "",
            page: "",   
        }
        this.loadCards = this.loadCards.bind(this);
    }

    loadCards(e) {
        e.preventDefault();
        axios.get(`${credentials.pokemonApiUrl}/cards`, {
            params: {
                setName: `"Base"`,
            },
        }, {
                headers: {
                    "count": `"30"`,
                },
        })
        .then((res) => {
            console.log(res)
            // this.setState({
            //     movies: data.results,
            // })
        })
    }

    // loadCards(e) {
    //     console.log('now loading cards');
        
    // }

    render() {
        return (
        <div>
            <button onClick={this.loadCards}>Click to load more cards</button>
            <p>hello</p>
        </div>
        )
    }
}

export default CardGrid;