import React, {useEffect, useState} from 'react';

import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import SurveyService from "../../services/survey.service";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import QuestionsDialog from "./QuestionsDialog";
import AnswersDialog from "./AnswersDialog";
import Copyright from "../Common/Copyright";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    table: {
        minWidth: 650,
    },
}));

export default function SurveyResults(props) {
    const classes = useStyles();
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
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [isAnswersDialogOpen, updateIsAnswersDialogOpen] = React.useState(false);
    const eventName = useParams().eventName;
    useEffect(() => {
        SurveyService.getEventQuestion(eventName)
            .then(response => {
                updateRows(response.data);
            })
    }, [])

    const toggleAnswersDialog = () => {
        updateIsAnswersDialogOpen(!isAnswersDialogOpen);
    }

    const onShowAnswers = (question) => {
        setCurrentQuestion(question);
        toggleAnswersDialog();
    }

    return (
        <div className="App">
            <h3>Survey Questions</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align="right">
                                Show Answers
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.question}>
                                <TableCell component="th" scope="row">
                                    {row.question}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        aria-label={row.question}
                                        color="primary"
                                        onClick={() => onShowAnswers(row.question)}
                                    >
                                        <SpeakerNotesIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AnswersDialog   question = {currentQuestion}
                             eventName={eventName}
                             isOpen={isAnswersDialogOpen}
                             onClose={toggleAnswersDialog}
            />
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
}