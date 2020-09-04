import axios from "axios";
import authHeader from "./auth-header";


const register = (username, email, password, firstname, lastname, turkishID) => {
    return axios.post( "/api/auth/signup", {
        username,
        email,
        password,
        firstname,
        lastname,
        turkishID,
    });
};

const addAdmin = (username, email, password, firstname, lastname, turkishID) => {
    return axios.post( "/api/auth/addAdmin", {
        username,
        email,
        password,
        firstname,
        lastname,
        turkishID,
    }, { headers: authHeader() });
};

const login = (username, password) => {
    return axios
        .post( "/api/auth/signin", {
            username,
            password,
        })
        .then((response) => {

            if (response.data.token) {
                console.log(JSON.stringify(response.data))
                localStorage.setItem("user", JSON.stringify(response.data));

            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
    addAdmin,
};
