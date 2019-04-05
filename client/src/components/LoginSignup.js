import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function LoginSignup(props) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [message, setMessage] = useState('');

    const login = e => {
        e.preventDefault();
        axios.post('http://localhost:3300/api/login', {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                props.history.push('/jokes');
            })
            .catch(err => {
                setMessage(`${err}`);
            })
    }

    const register = e => {
        e.preventDefault();
        axios.post('http://localhost:3300/api/register', {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        })
            .then(res => {
                setMessage(`${res.data.message}, now Login!`);
                usernameRef.current.value = "";
                passwordRef.current.value = "";
            })
            .catch(err => {
                setMessage(`${err}`);
            })
    }

    return (
        <div className="login_sigup">
            <form>
                <input ref={usernameRef} type="text" placeholder="username" />
                <input ref={passwordRef} type="password" placeholder="password" />
                <button onClick={e => register(e)} >Register</button>
                <button onClick={e => login(e)} >Login</button>
            </form>

            <p>{message}</p>
        </div>
    )
}