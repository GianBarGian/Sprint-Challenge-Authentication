import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joke from './Joke';

export default function Jokes(props) {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.setTimeout(() => {
                props.history.replace('/');
            }, 2000)
        } 
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3300/api/jokes', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                setJokes(res.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <div className="jokes">
            {
                localStorage.getItem('token')
                    ? jokes.map(joke => (
                        <Joke key={joke.id} joke={joke} />
                    ))
                    : <p>You are not authed to see this page. Redirecting!</p>
            }
        </div>
    )
}