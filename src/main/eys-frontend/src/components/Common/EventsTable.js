import React, {useEffect, useState} from 'react';
import PaginationTable from "../table/PaginationTable";
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventService from "../../services/event.service";
import authHeader from "../../services/auth-header";

export default function EventsTable(props) {

    const [rows, updateRows] = useState([]);

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
        console.log(props.isNext);
        axios.get("/events/" + (props.isNext ? "next" : "old"), { headers: authHeader() })
            .then(response => {
                updateRows(response.data)
            })
    }, [])


    const onEventDelete = (eventName) => {
        EventService.deleteEvent(eventName).then(response => {
                if (response.data.messageType === "SUCCESS") {
                    updateRows(rows.filter((event) => event.name !== eventName));
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            })
    }

    const onEventUpdate = (eventName) => {
        props.history.push("/updateEvent/" + eventName);
    }


    const eventsTableColumns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'startDate', label: 'Start Date', minWidth: 170},
        {id: 'endDate', label: 'End Date', minWidth: 170},
        {id: 'quota', label: 'Quota', minWidth: 100},
        {id: 'altitude', label: 'Latitude', minWidth: 100},
        {id: 'longitude', label: 'longitude', minWidth: 100},
    ];

    if(props.isNext) {
        eventsTableColumns.push(
            {id: "update", label: "Update Event", align: "right", onClick: onEventUpdate},
            {id: "delete", label: "Delete Event", align: "right", onClick: onEventDelete}
        )
    }

    return (
        <div className="App">
            <PaginationTable rows={rows} columns={eventsTableColumns}/>
            <ToastContainer/>
        </div>
    );

}