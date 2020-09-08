import axios from "axios";
import authHeader from "./auth-header";
import trim from "validator/es/lib/trim";


const checkInUser = (eventname, username) => {
    return axios.get("/ongoing/checkIn/" + encodeURIComponent(trim(eventname)) + "/" + encodeURIComponent(trim(username)), { headers: authHeader() });
};

export default {
    checkInUser,
}