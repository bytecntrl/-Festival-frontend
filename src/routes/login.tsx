import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MyFetch } from '../utils/my-fetch';
import useAccessToken from '../stores/access-token';
import useRefreshToken from '../stores/refresh-token';


export default function Login() {
    const [state, setState] = useState({"username": "", "password": ""});
    const [message, setMessage] = useState("");

    const {setAccessToken} = useAccessToken();
    const {setRefreshToken} = useRefreshToken();

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setState(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!state.username || !state.password) {
            setMessage("Password or username missing");
            return;
        }

        const resp = await MyFetch(
            `auth/?username=${state.username}&password=${state.password}`, 
            {method: "GET"}
        );

        if (resp.error) {
            setMessage(resp.message);
            return;
        }

        setAccessToken(resp.token);
        setRefreshToken(resp.refresh_token);

        return navigate("/");
    }

    return (
        <div className="container mt-3">
            {message ? <div className="alert alert-danger" role="alert">{message}</div> : null}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formInputUsername" className="form-label">Username:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="formInputUsername" 
                        placeholder="Input your username" 
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formInputPassword" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="formInputPassword" 
                        placeholder="Input your password" 
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}