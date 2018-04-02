import React from "react";
import { Link } from 'react-router-dom';

const SingleFranchise = (props) => {
    const alt = `Official logo for the ${props.franchiseName} Trading Card Game`;
    const fullClass = `SingleFranchise ${props.franchiseName} ${props.active}`;

    return (
        <Link to={`/franchises/${props.franchiseName}`} className={fullClass}>
            <div>
                <img src={props.image} alt={alt} />
            </div>
        </Link>

    )
        
};

export default SingleFranchise;
