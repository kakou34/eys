import React, {useEffect, useState} from 'react';
import PaginationTable from "../table/PaginationTable";
import axios from "axios";
import AuthService from "../../services/auth.service";
import 'react-toastify/dist/ReactToastify.css';
import authHeader from "../../services/auth-header";

export default function OldEvents(props) {

    const [rows, updateRows] = useState([]);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        axios.get("/oldEvents/byUser/" + encodeURIComponent(currentUser.username), { headers: authHeader() })
            .then(response => {
                console.log(response.data);
                updateRows(response.data);
            })
    }, [])

    const onShowCertificate = (eventName) => {
        let user = currentUser.firstname + " " + currentUser.lastname ;
        //Show  Certificate
        props.history.push("/image/" + eventName + "/certificate");
    }

    const oldEventsTableColumns = [
        {id: 'name', label: 'Event Name', minWidth: 170},
        {id: 'certificate', label: 'Participation Certificate', align: 'right', onClick: onShowCertificate}
    ];

    return (
        <div>
            <PaginationTable rows={rows} columns={oldEventsTableColumns}/>
        </div>
    );

}