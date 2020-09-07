import React, {useEffect, useState} from 'react';
import PaginationTable from "../table/PaginationTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import authHeader from "../../services/auth-header";
export default function UsersTable(props) {

    const [rows, updateRows] = useState([]);
    const eventName = useParams().eventName;

    useEffect(() => {
        axios.get("/feedback/" + encodeURIComponent(eventName), { headers: authHeader() })
            .then(response => {
                updateRows(response.data);
            })
    }, [])

    const onShowAnswers = (username) => {
        props.history.push("/answers/" + encodeURIComponent(eventName) + "/" + encodeURIComponent(username));
    }

    const usersTableColumns = [
        {id: 'firstname', label: 'Firstname', minWidth: 170},
        {id: 'lastname', label: 'Lastname', minWidth: 170},
        {id: 'turkishID', label: 'Turkish ID', minWidth: 170},
        {id: 'answers', label: 'Form Answers', minWidth: 170, align: "right", onClick:onShowAnswers},
    ];

    return (
        <div className="App">
            <PaginationTable rows={rows} columns={usersTableColumns}/>
        </div>
    );

}