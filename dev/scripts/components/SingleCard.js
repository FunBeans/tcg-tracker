import React from "react";

const SingleCard = (props) => {
   //  console.log(props)
    // console.log(props.data.imageUrl);
    return (
        <div className="SingleCard">
            <p>{props.data.name}</p>
            <img src={props.data.imageUrl} alt=""/>
        </div>
    )
};

export default SingleCard;