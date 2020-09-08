import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ApplicationService from "../../services/application.service";
import Button from "@material-ui/core/Button";
import {toast, ToastContainer} from 'react-toastify';


const QRCode = () => {
    const [content, setContent] = useState("https://icon-library.com/images/error-image-icon/error-image-icon-23.jpg");
    const eventName = useParams().eventName;
    const currentUser = AuthService.getCurrentUser();

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    useEffect(() => {
        ApplicationService.generateQRCode(eventName, currentUser.username)
            .then((response) => {
                let image = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                setContent( `data:${response.headers['content-type'].toLowerCase()};base64,${image}`);
            });
    }, []);

    const sendQRtoEmail = () => {
        ApplicationService.sendQRCode(eventName, currentUser.username).then(response => {
                console.log(response.data.message);
                if(response.data.messageType === "SUCCESS") {
                    toast.success(response.data.message, toastOptions);
                }
                else toast.error(response.data.message, toastOptions);
            }
        )
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Your QRCode:</h3>
                <img src={content} alt={"QRcode"}/>
            </header>
            <Button

                variant="contained"
                color="primary"
                preventDefault
                onClick={sendQRtoEmail}
            >
                Send To E-mail
            </Button>
            <ToastContainer/>
        </div>
    );
};

export default QRCode;
