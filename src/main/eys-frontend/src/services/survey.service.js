import axios from "axios";
import authHeader from "./auth-header";


const addQuestion = (eventName, data) => {
    return axios.post("/survey/"+ encodeURIComponent(eventName) + "/questions", data, { headers: authHeader() });
};

const getEventQuestion = eventName => {
    return axios.get("/survey/" + encodeURIComponent(eventName) + "/questions", { headers: authHeader() });
}

const deleteQuestion = (eventName, question) => {
    console.log(question);
    return axios.delete("/survey/" + encodeURIComponent(eventName) + "/questions/" +  encodeURIComponent(question), { headers: authHeader() });
}

export default {
    addQuestion,
    getEventQuestion,
    deleteQuestion,
}