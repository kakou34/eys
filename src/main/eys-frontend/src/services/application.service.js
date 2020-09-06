import axios from "axios";
import authHeader from "./auth-header";


const addSubmission = (eventName, userName, data) => {
    return axios.post("/apply/" + encodeURIComponent(eventName) + "/" + encodeURIComponent(userName), data, { headers: authHeader() });
}
const deleteSubmission = (eventName, userName, data) => {
    return axios.delete("/apply/" + encodeURIComponent(eventName) + "/" + encodeURIComponent(userName), { headers: authHeader() });
}

const addAnswer = (eventName, userName, question, answer) => {
    let url = "/apply/" + encodeURIComponent(eventName) +"/" + encodeURIComponent(userName) + "/" + encodeURIComponent(question) ;
    return axios.post( url , answer, { headers: authHeader() } );
}

const testQRCode = () => {
    return axios.get("/apply/qrcode/123456789" , { headers: authHeader() } );
}

const generateQRCode= (eventName, username) => {
    const url = "/apply/" + encodeURIComponent(eventName) + "/" + encodeURIComponent(username) + "/qrcode";
    return axios.get(url, { responseType: 'arraybuffer', headers: authHeader() });
}

const sendQRCode = (eventName, username) => {
    const url = "/apply/" + encodeURIComponent(eventName) + "/" + encodeURIComponent(username) + "/sendEmail";
    return axios.get(url, { headers: authHeader() });
}


export default {
    addSubmission,
    addAnswer,
    generateQRCode,
    deleteSubmission,
    sendQRCode,
}

