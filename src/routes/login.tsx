import React, { useState } from 'react';


export default function Login() {
    const [state, setState] = useState({"username": "", "password": ""});
    const [message, setMessage] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setState(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!state.username || !state.password) {
            setMessage("Password or username missing");
            return;
        }

        console.log("Login!");
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