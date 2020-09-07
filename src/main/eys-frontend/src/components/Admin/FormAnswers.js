import React from "react";
import {useEffect} from "react";
import { useParams } from "react-router-dom";
import FeedbackService from "../../services/feedback.service";

const FormAnswers = () => {
    const eventName = useParams().eventName;
    const username = useParams().username;
    const [rows, updateRows] = React.useState([]);
    useEffect(() => {
        FeedbackService.getAnswers(eventName, username)
            .then(response => {
               console.log(response.data);
                updateRows(response.data);
            })
    }, [])
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong></strong>
                </h3>
            </header>
            { rows.length !== 0 ?
                rows.map(row => (
                        <p>
                            <strong>{row.question}</strong> {row.answer}
                        </p>
                    )
                ) :
                (
                    <h3>No answers submitted</h3>
                )
            }
        </div>
    );
};

export default FormAnswers;
