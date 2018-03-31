import React from "react";

const LoginPage = props => {
    return (
        <div className="LoginPage">
            <p>Log In page</p>
            <button className="logIn" onClick={props.logInUser}>Log In</button>
            <button className="logIn" onClick={props.signOutUser}>Sign Out</button>
            <button className="googleSignIn" onClick={props.googleSignIn}>Google</button>
        </div>
    )
};

export default LoginPage;