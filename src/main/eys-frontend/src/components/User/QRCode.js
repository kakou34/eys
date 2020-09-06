import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ApplicationService from "../../services/application.service";


const QRCode = () => {
    const [content, setContent] = useState("https://icon-library.com/images/error-image-icon/error-image-icon-23.jpg");
    const eventName = useParams().eventName;
    const currentUser = AuthService.getCurrentUser();

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

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Your QRCode:</h3>
                <img src={content} alt={"QRcode"}/>
            </header>
        </div>
    );
};

export default QRCode;
