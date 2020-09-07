import React, {useEffect, useState} from 'react';
import PaginationTable from "../table/PaginationTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import authHeader from "../../services/auth-header";
export default function UsersTable() {

    const [rows, updateRows] = useState([]);
    const eventName = useParams().eventName;

    useEffect(() => {
        console.log("/feedback/" + encodeURIComponent(eventName));
        axios.get("/feedback/" + encodeURIComponent(eventName), { headers: authHeader() })
            .then(response => {
                console.log(response.data);
                updateRows(response.data);
            })
    }, [])


    const usersTableColumns = [
        {id: 'firstname', label: 'Firstname', minWidth: 170},
        {id: 'lastname', label: 'Lastname', minWidth: 170},
        {id: 'turkishID', label: 'Turkish ID', minWidth: 170},
    ];

    return (
        <div className="App">
            <PaginationTable rows={rows} columns={usersTableColumns}/>
        </div>
    );

}