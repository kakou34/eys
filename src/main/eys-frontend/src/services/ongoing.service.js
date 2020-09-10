import axios from "axios";
import authHeader from "./auth-header";
import trim from "validator/es/lib/trim";


const checkInUser = (eventname, username) => {
    return axios.get("/ongoing/checkIn/" + encodeURIComponent(trim(eventname)) + "/" + encodeURIComponent(trim(username)), { headers: authHeader() });
};

const addQuestion = (eventName, username, data) => {
    let message = {question: data.question, username: username, eventName: eventName};
    console.log(message);
    return axios.post("/ask", message, { headers: authHeader() });
};

const getQuestions = (eventName) => {
    return axios.get("/ask/questions/" + encodeURIComponent(eventName), {headers: authHeader()});
}

export default {
    checkInUser,
    addQuestion,
    getQuestions
}