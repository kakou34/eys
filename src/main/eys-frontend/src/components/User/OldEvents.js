import React, {useEffect, useState} from 'react';
import PaginationTable from "../table/PaginationTable";
import axios from "axios";
import {toast} from 'react-toastify';
import AuthService from "../../services/auth.service";
import SurveyService from "../../services/survey.service";
import 'react-toastify/dist/ReactToastify.css';
import authHeader from "../../services/auth-header";

export default function OldEvents(props) {
    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    const [rows, updateRows] = useState([]);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        axios.get("/oldEvents/byUser/" + encodeURIComponent(currentUser.username), { headers: authHeader() })
            .then(response => {
                updateRows(response.data);
            })
    }, [])

    const onShowCertificate = (eventName) => {

        //Show  Certificate
        props.history.push("/image/" + eventName + "/certificate");
    }
    const onShowSurvey = (eventName) => {
        SurveyService.hasSurvey(eventName).then(response => {
            if(response.data) {
                props.history.push("/survey/" + eventName );
            } else toast.info("This event has no survey", toastOptions)
        })

    }

    const oldEventsTableColumns = [
        {id: 'name', label: 'Event Name', minWidth: 170},
        {id: 'certificate', label: 'Participation Certificate', align: 'center', onClick: onShowCertificate},
        {id: 'survey', label: 'Answer Survey', align: 'right', onClick: onShowSurvey}
    ];

    return (
        <div>
            <PaginationTable rows={rows} columns={oldEventsTableColumns}/>
        </div>
    );

}