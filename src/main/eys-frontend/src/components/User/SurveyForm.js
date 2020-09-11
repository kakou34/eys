import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../Common/Copyright";
import SurveyService from "../../services/survey.service";
import {useParams} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "../../services/auth.service";

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

export default function SurveyForm(props) {
    const classes = useStyles();
    const eventName = useParams().eventName;
    const [rows, updateRows] = React.useState([]);
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

    const handleAnswerChange = (event, index) => {
        rows[index].answer = event.target.value;
        updateRows(rows);
    }


    const handleSubmit = () => {
        const rowLen = rows.length;
        rows.forEach((row,i) => {
            let error = false;
            if(rowLen === i + 1 ) {
                SurveyService.addAnswer(eventName, currentUser.username, row.question, row).then(
                    response => {
                        if(response.data.messageType === "ERROR"){
                            error = true
                        }

                        if(error) toast.error("Survey not submitted", toastOptions);
                        else toast.success("Survey successfully submitted", toastOptions);
                    }
                )
            } else {
                SurveyService.addAnswer(eventName, currentUser.username, row.question, row).then(
                    response => {
                        if(response.data.messageType === "ERROR"){
                            error = true;
                        }
                    }
                )
            }

        });
    }


    useEffect(() => {
        SurveyService.getEventQuestion(eventName)
            .then(response => {
                let newRows = response.data;
                newRows.forEach(row => row.answer = '');
                updateRows(newRows);
            })
    }, [])

    return (

        <Container component="main" maxWidth="lg">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Answer Survey for Event: {eventName}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        {rows.map((row) => (
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name={row.question}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleAnswerChange(e, rows.indexOf(row))}
                                    id={row.question}
                                    label={row.question}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12} alignContent={"center"}>
                            <Button
                                variant="contained"
                                color="primary"
                                preventDefault
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}