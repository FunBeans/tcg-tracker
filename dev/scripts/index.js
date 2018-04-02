import React from 'react';
import { render } from "react-dom";
import Router from "./components/Router.js"
// import NavBar from "./components/NavBar.js"

//Initialize Firebase
var config = {
    apiKey: "AIzaSyBBYLdmlmT9lKiupqDCj54i4rSnGyZxAlM",
    authDomain: "tcg-tracker.firebaseapp.com",
    databaseURL: "https://tcg-tracker.firebaseio.com",
    projectId: "tcg-tracker",
    storageBucket: "",
    messagingSenderId: "401497468582"
};
firebase.initializeApp(config);


class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            user: {},
            loginEmail: '',
            loginPassword: '',
            usersDeck: [],
        }

        this.logInUser = this.logInUser.bind(this);
        this.signOutUser = this.signOutUser.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
    }

    logInUser(event) {
        event.preventDefault();
        const email = this.state.loginEmail;
        const password = this.state.loginPassword;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                // close modal after login
                this.setState({
                    showLogin: false,
                });
            }), (error) => {
                console.log(error);
            }
    }

    googleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: 'select_account'
        });

        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                console.log('user has logged in')
            }), (error) => {
                alert(error);
            }
    }

    signOutUser() {
        firebase.auth().signOut().then(function (res) {
        }, function (error) {
            console.log(error);
        });

        this.setState({
            user: {},
            loggedIn: false
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((res) => {
            if (res) {
                this.setState({
                    loggedIn: true,
                    user: res
                }, () => {
                });
                // code below grabs the user's event objects (userEvents) and array of ids where they are hosts for (userHostEvents) and sets it in state. It will be passed down to dashboard.
                // const dbref = firebase.database().ref(`/Users/${res.uid}/events`);
                // dbref.on('value', (snapshot) => {

                //     const eventsData = snapshot.val();
                //     const copyOfDB = [];
                //     const hostedEvents = [];
                //     for (let key in eventsData) {
                //         eventsData[key].key = key;
                //         copyOfDB.push(eventsData[key]);
                //     }
                //     for (let key in eventsData) {
                //         eventsData[key].key = key;
                //         if (eventsData[key].isHost === true) {
                //             hostedEvents.push(eventsData[key].key);
                //         }
                //     }
                //     this.setState({
                //         userEvents: copyOfDB,
                //         userHostEvents: hostedEvents
                //     });
                // });
            }
            else {
                this.setState({
                    loggedIn: false,
                    user: res,
                });
            }
        })
    }


    render() {
        return (
            <div className="Index">
                {/* <NavBar logInUser={this.logInUser} googleSignIn={this.googleSignIn} signOutUser={this.signOutUser} /> */}
                <Router />
            </div>
        )
    }
};

export default Index;

render(<Index />, document.querySelector("#app"));