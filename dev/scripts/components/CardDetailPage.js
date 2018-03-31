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
    }

    componentDidMount() {
        console.log(this.props.match.params.cardId);
        this.setState({ cardId : this.props.match.params.cardId },
            () => {
                // wait until state is set before making axios call
                this.getCardInfo();
            }
        )
    }

    getCardInfo() {
        axios.get(`${credentials.pokemonApiUrl}/cards/${this.state.cardId}`)
            .then((res) => {
                this.setState({
                    cardInfo : res.data.card,
                })
            });
    }

    render() {     
        console.log(this)   
        return (
            <main>
                <p>Card detail page</p>
                {/* <p>{this.state.cardId}</p> */}
                <a href="" onClick={this.props.history.goBack}>ihihih</a>
            </main>
        )
    }
};

export default CardDetailPage;
