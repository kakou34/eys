import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ApplicationService from "../../services/application.service";
import FeedbackService from "../../services/feedback.service";
import Button from "@material-ui/core/Button";
import {toast, ToastContainer} from 'react-toastify';


const ImageViewerSender = () => {
    const [content, setContent] = useState("https://img.icons8.com/cotton/2x/error--v1.png");
    const eventName = useParams().eventName;
    const type = useParams().imgType;
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
        if(type === "qrCode") {
            ApplicationService.generateQRCode(eventName, currentUser.username)
                .then((response) => {
                    let image = btoa(
                        new Uint8Array(response.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    setContent( `data:${response.headers['content-type'].toLowerCase()};base64,${image}`);
                });
        }

        if(type === "certificate") {
            let name = currentUser.firstname + " " + currentUser.lastname;
            FeedbackService.generateCertificate(eventName, name)
                .then((response) => {
                    let image = btoa(
                        new Uint8Array(response.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    setContent( `data:${response.headers['content-type'].toLowerCase()};base64,${image}`);
                });
        }



    }, []);

    const sendToEmail = () => {

        if(type === "qrCode") {
            ApplicationService.sendQRCode(eventName, currentUser.username).then(response => {
                    if(response.data.messageType === "SUCCESS") {
                        toast.success(response.data.message, toastOptions);
                    }
                    else toast.error(response.data.message, toastOptions);
                }
            )
        }
        if(type === "certificate") {
            FeedbackService.sendCertificate(eventName, currentUser.username).then(response => {
                    console.log(response.data.message);
                    if(response.data.messageType === "SUCCESS") {
                        toast.success(response.data.message, toastOptions);
                    }
                    else toast.error(response.data.message, toastOptions);
                }
            )
        }
    }

    return (
        <div className="container">
            <div>
                <h4>Your {type}:</h4>
                <img width={500} height={450} src={content} alt={type}/>
            </div>
            <Button

                variant="contained"
                color="primary"
                preventDefault
                onClick={sendToEmail}
            >
                Send To E-mail
            </Button>
            <ToastContainer/>
        </div>
    );
};

export default ImageViewerSender;
