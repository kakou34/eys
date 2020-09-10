import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {toast} from 'react-toastify';


const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
};

let stompClient = null;
let socket = new SockJS('/eys');
stompClient = Stomp.over(socket);

const connectAdmin = (eventName) => {
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/newMessage', function (event) {
             return (eventName === event.body);
        });
    })
}


const connectUser = () => {
    stompClient.connect({}, function (frame) {
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendApplicationNotification(message) {
    stompClient.send("/app/notification", {}, message);
}

function sendNewMessageNotif(eventName) {
    console.log("eventname: " + eventName);
    stompClient.send("/app/newMessage", {}, eventName);
}

export default {
    connectAdmin,
    connectUser,
    disconnect,
    sendApplicationNotification,
    sendNewMessageNotif,
}

