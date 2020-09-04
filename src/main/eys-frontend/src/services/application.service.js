import axios from "axios";
import authHeader from "./auth-header";


const addSubmission = (eventName, userName, data) => {
    return axios.post("/apply/" + encodeURIComponent(eventName) + "/" + encodeURIComponent(userName), data, { headers: authHeader() });
}

const addAnswer = (eventName, userName, question, answer) => {
    console.log("answer:" + answer);
    let url = "/apply/" + encodeURIComponent(eventName) +"/" + encodeURIComponent(userName) + "/" + encodeURIComponent(question) ;
    return axios.post( url , answer, { headers: authHeader() } )
}


export default {
    addSubmission,
    addAnswer
}

