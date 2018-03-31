import React from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
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
            allCardsInSet: [],
            // cardName: [],
            page: null,
            loadedCards: false,
            filteredCards: [],
        }

        this.loadCards = this.loadCards.bind(this);
        this.filterCard = this.filterCard.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.loadMoreCards = this.loadMoreCards.bind(this);

        // this.renderSingleCards = this.renderSingleCards.bind(this);
    }

    componentDidMount() {
        this.loadCards(1);
    }

    loadCards(page) {
        // create the parameters and headers for axios call

        // make axio calls to retrive all cards in set
        // want to retrieve first 20 cards??
        axios.get(`${credentials.pokemonApiUrl}/cards`,  {
            params: {
                setCode: 'sm4',
                page: page,
                pageSize: "100"
            }
        }).then((res) => {
            const allCards = this.state.allCardsInSet.concat(res.data.cards);

            // console.log(this.state.allCardsInSet);
            // console.log(res.data.cards);
            // console.log(allCards);
            this.setState({
                allCardsInSet: allCards,
                loadedCards: true,
            }) 
        });
    }

    loadMoreCards() {
        this.loadCards(2);
    }

    filterCard(e){
        // filterType is the value of checkbox that's selected
        const filterType = e.target.value;
        // console.log(filterType)
        // if this is the first checkbox selected, filter from allCardsInSet. if there are multiple checkboxes selected then filter the filteredCards. 
        let filterArr;
        if(this.state.filteredCards === []) {
            filterArr = this.state.filteredCards;
        } else {
            filterArr = this.state.allCardsInSet;
        }
        // create new array containing the specific cards that has the selected type
        const filteredCards = filterArr.filter(card => {
            // if the card is missing "types" data then skip it
            // console.log(card)
            if(card.types) {
                console.log(card.types[0].toLowerCase());
                console.log(filterType);
                console.log(card.types[0].toLowerCase() === filterType);
                card.types.includes(filterType);
                return card.types[0].toLowerCase() === filterType;
            }
        });

        // set filtered cards into state.
        console.log(filteredCards);
        this.setState({ filteredCards });
    }

    clearFilters(e) {
        e.preventDefault();
        this.setState({ filteredCards : [] })
    }

    render() {
        // JavaScript Lives here!!
        // console.log(this.state.allCardsInSet);
        // make the dataset (current state) into a variable 
        // if cards are filtered, display the filteredCards. if no filters, display full list
        let cardSet;
        console.log(this.state.filteredCards !== []);
        { this.state.filteredCards[0] ?
            cardSet = this.state.filteredCards
            :
            cardSet = this.state.allCardsInSet
        }


        console.log(cardSet);
        return (
            <main className="CardGrid">
                <div className="wrapper">
                    <h1>This is the card grid page</h1>
                   <form> 
                       <h2>Filter By</h2>
                        <div className="selectSet">
                            <label htmlFor="set">Set</label>
                            <input type=""/>
                        </div>
                        <div className="selectType">
                            <h3>Type</h3>
                            <label htmlFor="lightning">Electric</label>
                            <input onChange={(e) => this.filterCard(e)} type="checkbox" value="lightning"/>

                            <label htmlFor="ground">Ground</label>
                            <input onChange={(e) => this.filterCard(e)} type="checkbox" value="ground"/>

                            <label htmlFor="grass">Grass</label>
                            <input onChange={(e) => this.filterCard(e)} type="checkbox" value="grass"/>

                            <label htmlFor="fire">Fire</label>
                            <input onChange={(e) => this.filterCard(e)} type="checkbox" value="fire"/>

                            <label htmlFor="ghost">Ghost</label>
                            <input onChange={(e) => this.filterCard(e)} type="checkbox" value="ghost"/>

                            <button onClick={(e) => this.clearFilters(e)}>Clear Filters</button>
                        </div>
                        {/* <label htmlFor="set">Set</label>
                        <input type="" /> */}
                    </form>
                    <div className="displayCards">
                        {
                            // this.state.loadedCards ? console.log('cards are loaded') : console.log('nothing there')
                            this.state.loadedCards ? 
                            cardSet.map(card => {
                                console.log(cardSet); 
                                return (
                                    <Link key={card.id} to={`/franchises/pokemon/${card.id}`}>
                                        <SingleCard data={card} key={card.id} />
                                    </Link>
                                )
                                // console.log(card);
                            })
                            : 
                            null 
                        }
                        
                    </div>

                    <button onClick={this.loadMoreCards}>Next Page</button>
                </div>
            </main>
        )
    }
}

export default CardGridPage;