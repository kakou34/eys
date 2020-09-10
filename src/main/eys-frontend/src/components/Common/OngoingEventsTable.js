import React, {useEffect, useState} from 'react';
import PaginationTable from "../table/PaginationTable";
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import authHeader from "../../services/auth-header";
import AuthService from "../../services/auth.service";
import OngoingService from "../../services/ongoing.service"

import ReactDialog from "./ReactDialog";
import QuestionsDialog from "../Admin/QuestionsDialog";
import SocketService from "../../services/socket.service";

export default function OngoingEventsTable(props) {
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
    const [isAddQuestionModalOpen, updateIsAddQuestionModalOpen] = React.useState(false);
    const [questionsRows, updateQuestionsRows] = React.useState([]);
    const [currentEvent, setCurrentEvent] = useState("");
    const [isQuestionsDialogOpen, updateIsQuestionsDialogOpen] = React.useState(false);

    const toggleAddQuestionModal = () => {
        updateIsAddQuestionModalOpen(!isAddQuestionModalOpen);
    }
    const toggleQuestionsDialog = () => {
        updateIsQuestionsDialogOpen(!isQuestionsDialogOpen);
    }
    const questionDialogFields = [
        {id: "question", label: "Question", type: "text"},
    ]

    const submitQuestionAdd = (inputData) => {
        toggleAddQuestionModal();
        OngoingService.addQuestion(currentEvent, currentUser.username, inputData)
            .then(response => {
                if (response.data.messageType === "SUCCESS") {
                    SocketService.sendNewMessageNotif(currentEvent);
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            });
    }
    useEffect(() => {
        if (currentUser.authorities.includes("ROLE_ADMIN")) {

        }
        axios.get("/ongoing/events", {headers: authHeader()})
            .then(response => {
                updateRows(response.data)
            })
    }, [])

    const onShowInstantQs = (eventName) => {
        OngoingService.getQuestions(eventName).then(response => {
            let questions = response.data;
            setCurrentEvent(eventName);
            updateQuestionsRows(questions);
            toggleQuestionsDialog();
        });
    }

    const onSendInstantMsg = (eventName) => {
        let isAllowed = false;
        const url = "/ongoing/checkUserCheckin/" + encodeURIComponent(currentUser.username) + "/" + encodeURIComponent(eventName);
        axios.get(url, {headers: authHeader()}).then(response => {
            isAllowed = response.data;
            if (isAllowed) {
                setCurrentEvent(eventName);
                toggleAddQuestionModal();
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
            {(rows.length > 0) ? (
                <div>
                    <PaginationTable rows={rows} columns={eventsTableColumns}/>
                    <ReactDialog fields={questionDialogFields} title="Ask a question" isOpen={isAddQuestionModalOpen}
                                 onClose={toggleAddQuestionModal}
                                 onSubmit={submitQuestionAdd}/>
                    <QuestionsDialog rows={questionsRows}
                                     eventName={currentEvent}
                                     isOpen={isQuestionsDialogOpen}
                                     onClose={toggleQuestionsDialog}
                    />
                </div>
            ) : (
                <h3>There are no ongoing Events currently...</h3>
            )}
        </div>
    );

}