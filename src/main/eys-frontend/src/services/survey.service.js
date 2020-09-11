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

const addAnswer = (eventName, userName, question, answer) => {
    let url = "/survey/" + encodeURIComponent(eventName) +"/" + encodeURIComponent(userName) + "/" + encodeURIComponent(question) ;
    return axios.post( url , answer, { headers: authHeader() } );
}

const hasSurvey = (eventName) => {
    return axios.get("/survey/" + encodeURIComponent(eventName) + "/hasSurvey", { headers: authHeader() } );
}

const getAnswers = (eventName, question) => {
    return axios.get("/survey/" + encodeURIComponent(eventName) +"/" + encodeURIComponent(question)+ "/answers", { headers: authHeader() } );

}

export default {
    addQuestion,
    getEventQuestion,
    deleteQuestion,
    addAnswer,
    hasSurvey,
    getAnswers
}