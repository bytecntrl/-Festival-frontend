import React from "react";
import { Link } from "react-router-dom";

import { Auth } from "../utils/auth";
import useAccessToken from "../stores/access-token";
import useRefreshToken from "../stores/refresh-token";


function NavBar() {
    const {accessToken} = useAccessToken();
    const {refreshToken} = useRefreshToken();
    
    const auth = new Auth(accessToken, refreshToken);

    let links = [<Link key="0" to="/" className="nav-link active">Home</Link>];

    if (!auth.isLoggedIn()) {
        if (auth.isTokenExpired())
            links.push(<Link key="1" to="/login" className="nav-link">Login</Link>);
        else
            links.push(<Link key="2" to="/token" className="nav-link">Token</Link>);
    }

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
                    <div className="navbar-nav">
                        {links}
                    </div>
                </div>
            </div>
        </nav>
    );
}


export default NavBar;
