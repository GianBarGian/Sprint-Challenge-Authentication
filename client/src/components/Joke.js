import React from 'react';

export default function Joke({ joke }) {
    return (
        <div className="joke">
            <p>{joke.joke}</p>
        </div>
    )
}