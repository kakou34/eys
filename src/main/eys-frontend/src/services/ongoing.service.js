import axios from "axios";
import authHeader from "./auth-header";
import trim from "validator/es/lib/trim";


const checkInUser = (eventname, username) => {
    return axios.get("/ongoing/checkIn/" + encodeURIComponent(trim(eventname)) + "/" + encodeURIComponent(trim(username)), { headers: authHeader() });
};

const addQuestion = (eventName, username, data) => {
    console.log(data);
    return axios.post("/ask/"+ encodeURIComponent(eventName) + "/" + encodeURIComponent(username), data, { headers: authHeader() });
};

export default {
    checkInUser,
    addQuestion,
}