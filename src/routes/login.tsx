import React, { useState } from 'react';


export default function Login() {
    const [state, setState] = useState({"username": "", "password": ""});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setState(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(state);
    }

    return (
        <div className="container mt-3">
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