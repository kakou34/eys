import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../Common/Copyright";
import EventService from "../../services/event.service"
import { useParams } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "../../services/auth.service";
import ApplicationService from "../../services/application.service";

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

export default function ApplicationForm(props) {
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
        const emptyAnswers = rows.filter(row => row.answer === '');
        if(emptyAnswers.length>0) {
            toast.error("Please answer all questions and submit again", toastOptions);
        } else {
            //Submit application
            ApplicationService.addSubmission(eventName, currentUser.username, null).then(
                response => {
                    //if the user did not apply for event before, add answers and show QR Code and send it to email
                    if (response.data.messageType === "SUCCESS") {
                        //adding answers
                        rows.forEach(row => {
                            ApplicationService.addAnswer(eventName, currentUser.username, row.question, row.answer).then(
                                response => {
                                    if (response.data.messageType === "ERROR") toast.error(response.data.message, toastOptions);
                                }
                            )
                        });

                        //sending QR Code to email

                        ApplicationService.sendQRCode(eventName, currentUser.username).then(response => {
                            console.log(response.data.message);
                            if(response.data.messageType === "SUCCESS") {
                                toast.success(response.data.message, toastOptions);
                                props.history.push("/qrcode/" + eventName);
                            }
                            else toast.error(response.data.message, toastOptions);
                            }
                        )


                    } else toast.error(response.data.message, toastOptions);
                }
            )
        }

    }


    useEffect(() => {
        EventService.getEventQuestion(eventName)
            .then(response => {
                let newRows = response.data;
                newRows.forEach(row => row.answer = '');
                updateRows(newRows);
            })
    }, [])

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <ToastContainer/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Apply for Event: {eventName}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstname"
                                variant="outlined"
                                fullWidth
                                id="firstname"
                                label="First Name:"
                                value={currentUser.firstname}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastname"
                                variant="outlined"
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                value={currentUser.lastname}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                name="turkishID"
                                variant="outlined"
                                fullWidth
                                id="turkishID"
                                label="Turkish ID:"
                                value={currentUser.turkishID}
                                disabled
                            />
                        </Grid>
                        <Divider/>
                        {rows.map((row) => (
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    name={row.question}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e)=>handleAnswerChange(e, rows.indexOf(row))}
                                    id={row.question}
                                    label={row.question}
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                preventDefault
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}