import jwtDecode from "jwt-decode";

import { ROLES } from "./constants";


interface Token {
    username: string
    role: string
    exp: number
    type: string
}


export class Auth {
    private access_token = "";
    private refresh_token = "";

    constructor(access: string, refresh: string) {
        this.access_token = access;
        this.refresh_token = refresh;
    }

    isTokenExpired(): boolean {
        if (this.refresh_token !== "") {
            return new Date((jwtDecode(this.refresh_token) as Token).exp * 1000) < new Date();
        }

        return true;
    }

    isAccesTokenExpired(): boolean {
        if (this.access_token !== "") {
            return new Date((jwtDecode(this.access_token) as Token).exp * 1000) < new Date();
        }

        return true;
    }

    isLoggedIn(): boolean {
        return !this.isTokenExpired() && !this.isAccesTokenExpired();
    }

    isAdmin(): boolean {
        if (this.isLoggedIn()) {
            return (jwtDecode(this.refresh_token) as Token).role == "admin";
        }

        return false;
    }

    hasRoles(): boolean {
        if (this.isLoggedIn()) {
            return ROLES.includes((jwtDecode(this.refresh_token) as Token).role);
        }
        
        return false;
    }

    getUsername(): string {
        if (this.isLoggedIn()) {
            return (jwtDecode(this.refresh_token) as Token).username;
        }
        
        return "";
    }
}
