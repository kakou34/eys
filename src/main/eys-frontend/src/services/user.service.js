import axios from "axios";
import authHeader from "./auth-header";

//const API_URL = "http://localhost:8080/";

const getPublicContent = () => {
    return axios.get( "/api/test/all");
};

const getUserBoard = () => {
    return axios.get("/api/test/user", { headers: authHeader() });
};


const getAdminBoard = () => {
    return axios.get( "/api/test/admin", { headers: authHeader() });
};


export default {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
};
