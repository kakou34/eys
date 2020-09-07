import axios from "axios";
import authHeader from "./auth-header";

const getAnswers = (eventName, username) => {
    const url = "/feedback/" + encodeURIComponent(eventName) + "/" + encodeURIComponent(username);
    return axios.get(url, { headers: authHeader() });
}


export default {
    getAnswers,
}
