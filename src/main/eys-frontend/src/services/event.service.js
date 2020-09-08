import axios from "axios";
import authHeader from "./auth-header";


const addEvent = data => {
    return axios.post("/events", data, { headers: authHeader() });
};

const deleteEvent = eventName => {
    return axios.delete("/events/" + encodeURIComponent(eventName), { headers: authHeader() });
}

const getEvent = eventName => {
    return axios.get("/events/" + encodeURIComponent(eventName), { headers: authHeader() });
}
const getAll = () => {
    return axios.get("/events/all", { headers: authHeader() });
}

const updateEvent = (eventName, data) => {
    return axios.put("/events/" + encodeURIComponent(eventName) , data, { headers: authHeader() });
};

const addQuestion = (eventName, data) => {
    return axios.post("/events/"+ encodeURIComponent(eventName) + "/questions", data, { headers: authHeader() });
};

const getEventQuestion = eventName => {
    return axios.get("/events/" + encodeURIComponent(eventName) + "/questions", { headers: authHeader() });
}

const deleteQuestion = (eventName, question) => {
    console.log(question);
    return axios.delete("/events/" + encodeURIComponent(eventName) + "/questions/" +  encodeURIComponent(question), { headers: authHeader() });
}


export default {
    updateEvent,
    addEvent,
    deleteEvent,
    getEvent,
    addQuestion,
    getEventQuestion,
    deleteQuestion,
    getAll,
};