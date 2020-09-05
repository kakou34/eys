import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";


const TestQRCode = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        axios.get("/apply/qrcode/123456789", { responseType: 'arraybuffer', headers: authHeader() })
            .then((response) => {
                let image = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                console.log(`data:${response.headers['content-type'].toLowerCase()};base64,${image}`);
                setContent( `data:${response.headers['content-type'].toLowerCase()};base64,${image}`);
            });
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>IMAGE:</h3>
                <img src={content} alt={"yoooo"}/>
            </header>
        </div>
    );
};

export default TestQRCode;
