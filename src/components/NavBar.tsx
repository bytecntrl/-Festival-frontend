import React from "react";
import { NavLink, Link } from "react-router-dom";

import { Auth } from "../utils/auth";
import useAccessToken from "../stores/access-token";
import useRefreshToken from "../stores/refresh-token";


function NavBar() {
    const accessToken = useAccessToken();
    const refreshToken = useRefreshToken();
    
    const auth = new Auth(accessToken.accessToken, refreshToken.refreshToken);

    const logout = function () {
        accessToken.reset();
        refreshToken.reset();
    }

    let links = [<NavLink key="0" to="/" className="nav-link">Home</NavLink>];

    if (!auth.isLoggedIn()) {
        if (auth.isTokenExpired())
            links.push(<NavLink key="1" to="/login" className="nav-link">Login</NavLink>);
        else
            links.push(<NavLink key="2" to="/token" className="nav-link">Token</NavLink>);
    }

    if (auth.hasRoles()) {
        links.push(<NavLink key="3" to="/order" className="nav-link">Order</NavLink>);
    }

    if (auth.isAdmin()) {
        links.push(<NavLink key="4" to="/users" className="nav-link">Users</NavLink>);
        links.push(<NavLink key="5" to="/subcategories" className="nav-link">Subcategories</NavLink>);
        links.push(<NavLink key="6" to="/products" className="nav-link">Products</NavLink>);
        links.push(<NavLink key="7" to="/menu" className="nav-link">Menu</NavLink>);
    }

    if (auth.isLoggedIn()) {
        links.push(<NavLink key="8" to="/profile" className="nav-link">Profile</NavLink>);
        links.push(<Link key="9" to="/" className="nav-link" onClick={logout}>Logout</Link>);
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
