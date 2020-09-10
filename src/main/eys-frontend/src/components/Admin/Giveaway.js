import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../Common/Copyright";
import FeedbackService from "../../services/feedback.service";
import {toast, ToastContainer} from 'react-toastify';
import trim from "validator/es/lib/trim";

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
}));

export default function Giveaway() {
    const classes = useStyles();
    const toastOptions = {
        position: "top-center",
        autoClose: 1000000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    const [eventname, setEventname] = React.useState("");
    const handleEventnameChange = event => setEventname(event.target.value);

    const handleSubmit = () => {
        FeedbackService.getWinner(trim(eventname)).then(response => {
            if (response.data !== "") {
                setEventname("");
                let message = "The winner is " + response.data.firstname + " " + response.data.lastname + "! Congratulations!!";
                toast.success(message, toastOptions);
            } else toast.error("Users or Event Not found, please make sure the event had attendees and try again!", toastOptions);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Generate a winner
                </Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={eventname === ""}
                                name="eventname"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Event Name"
                                value={eventname}
                                autoFocus
                                onChange={handleEventnameChange}
                                helperText={eventname === "" && "Event Name is required"}
                            />

                        </Grid>

                    </Grid>
                    <Button
                        disabled={eventname === ""}
                        fullWidth
                        variant="contained"
                        color="primary"
                        preventDefault
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Get Winner
                    </Button>
                </form>

            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}