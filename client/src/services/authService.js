import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/auth/";

class AuthService {
    constructor() {
        this.authenticated = false;
    }
    login(username, password) {
        return axios
            .post(AUTH_URL + "signin", { username, password })
            .then((response) => {
                if (response.data.token) {
                    this.authenticated = true;
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch((err) => {
                return err.response.data;
            });
    }

    logout() {
        this.authenticated = false;
        localStorage.removeItem("user");
    }

    register(email, username, password) {
        return axios
            .post(AUTH_URL + "signup", {
                username,
                email,
                password,
                role: "ROLE_USER"
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                return err.response.data;
            });
    }

    isAuthenticated() {
        return this.authenticated;
    }
    getCurrentCustomer() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();