import axios from "axios";
import authHeader from "./auth-header";

const getAnswers = (eventName, username) => {
    const url = "/feedback/" + encodeURIComponent(eventName) + "/" + encodeURIComponent(username);
    return axios.get(url, { headers: authHeader() });
}

const getSubmissionsPerEvent = () => {
    return axios.get("/feedback/SubmissionsPerEvent", { headers: authHeader() });
}

const getEventSubmissionsPerDay = (eventName) => {
    return axios.get("/feedback/EventsSubmissionCountPerDay/" + encodeURIComponent(eventName), {headers : authHeader()});
}


export default {
    getAnswers,
    getSubmissionsPerEvent,
    getEventSubmissionsPerDay,
}
