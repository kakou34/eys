import React, {useEffect, useState} from 'react';
import PaginationTable from "../table/PaginationTable";
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import authHeader from "../../services/auth-header";
import AuthService from "../../services/auth.service";
import OngoingService from "../../services/ongoing.service"
import ReactDialog from "./ReactDialog";

export default function OngoingEventsTable(props) {
    const [rows, updateRows] = useState([]);

    const [currentEvent, setCurrentEvent] = useState("");
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

    const [isAddQuestionModalOpen, updateIsAddQuestionModalOpen] = React.useState(false);

    const toggleAddQuestionModal = () => {
        updateIsAddQuestionModalOpen(!isAddQuestionModalOpen);
    }
    const questionDialogFields = [
        {id: "question", label: "Question", type: "text"},
    ]

    const submitQuestionAdd = (inputData) => {
        toggleAddQuestionModal();

        OngoingService.addQuestion(currentEvent, currentUser.username, inputData)
            .then(response => {
                if (response.data.messageType === "SUCCESS") {
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            });
    }
    useEffect(() => {
        axios.get("/ongoing/events", {headers: authHeader()})
            .then(response => {
                updateRows(response.data)
            })
    }, [])

    const onShowInstantQs = (eventName) => {
        toast.success("here ur questions", toastOptions);
    }

    const onSendInstantMsg = (eventName) => {
        let isAllowed = false;
        const url = "/ongoing/checkUserCheckin/" + encodeURIComponent(currentUser.username) + "/" + encodeURIComponent(eventName);
        axios.get(url, {headers: authHeader()}).then(response => {
            isAllowed = response.data;
            if (isAllowed) {
                toggleAddQuestionModal();
                setCurrentEvent(eventName);
            } else toast.error("You did not check in for this event.", toastOptions);
        });

    }


    const eventsTableColumns = [
        {id: 'name', label: 'Name', minWidth: 170},
    ];
    if (props.isAdmin) {
        eventsTableColumns.push(
            {id: "message", label: "Show instant questions", align: "right", onClick: onShowInstantQs}
        )
    } else {
        eventsTableColumns.push(
            {id: "message", label: "Send instant question", align: "right", onClick: onSendInstantMsg}
        )
    }

    return (
        <div>
            {(rows.length > 0) ? (<PaginationTable rows={rows} columns={eventsTableColumns}/>) : (
                <h3>There are no ongoing Events currently...</h3>
            )}

            <ReactDialog fields={questionDialogFields} title="Add Question" isOpen={isAddQuestionModalOpen}
                         onClose={toggleAddQuestionModal}
                         onSubmit={submitQuestionAdd}/>
        </div>
    );

}