import React from 'react';
import { Link } from 'react-router-dom';

function ShowCard ({ preview }) {
    return (
        <div className="show-card">
            <Link to={`/show/${preview}`}>
            <img src={preview.image} alt={preview.title} />
            <h2>{preview.title}</h2>
            <p>{preview.description}</p>
            <p>{preview.seasons} Seasons</p>
            </Link>
        </div>
    )
}

export default ShowCard;