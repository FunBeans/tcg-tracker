import React from "react";

const SingleCard = (props) => {
   //  console.log(props)
    // console.log(props.data.imageUrl);
    return (
        <div className="SingleCard">
            <h3>{props.data.name}</h3>
            <img src={props.data.imageUrl} alt=""/>
        </div>
    )
};

export default SingleCard;