import React from "react";
import { Link } from "react-router-dom";

import { Auth } from "../utils/auth";
import useAccessToken from "../stores/access-token";
import useRefreshToken from "../stores/refresh-token";


function NavBar() {
    const {accessToken} = useAccessToken();
    const {refreshToken} = useRefreshToken();
    
    const auth = new Auth(accessToken, refreshToken);

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Festival</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    {
                        !auth.isLoggedIn() ?
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link active">Home</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                        </div> : null
                    }
                </div>
            </div>
        </nav>
    );
}


export default NavBar;
