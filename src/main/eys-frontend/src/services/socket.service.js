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
const connectAdmin = ( function1 ) => {
    let socket = new SockJS('/eys');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/newApplication', function (notification) {
            function1(notification);
        });
    });
}

const connectUser = () => {
    let socket = new SockJS('/eys');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
    });
}


function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.send("/app/hello", {}, JSON.stringify({'message': "Kaouther"}));
}

function sendApplicationNotification (message) {
    stompClient.send("/app/notification", {}, message);
}

export default {
    connectAdmin,
    connectUser,
    disconnect,
    sendMessage,
    sendApplicationNotification,
}

