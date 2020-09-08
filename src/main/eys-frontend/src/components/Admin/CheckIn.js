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
import OngoingService from "../../services/ongoing.service";
import {toast, ToastContainer} from 'react-toastify';

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

export default function AddEvent() {
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

    const [username, setUsername] = React.useState("");
    const [eventname, setEventname] = React.useState("");

    const handleUsernameChange = event => setUsername(event.target.value);
    const handleEventnameChange = event => setEventname(event.target.value);

    const handleSubmit = () => {
        OngoingService.checkInUser(eventname, username).then(response => {
            if (response.data.messageType === "SUCCESS") {
                setEventname("");
                setUsername("");
                toast.success(response.data.message, toastOptions);
            } else {
                toast.error(response.data.message, toastOptions);
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Check In
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
                        <Grid item xs={12}>
                            <TextField
                                error={username === ""}
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                value={username}
                                autoFocus
                                onChange={handleUsernameChange}
                                helperText={username === "" && "Username is required"}
                            />

                        </Grid>
                    </Grid>
                    <Button
                        disabled={( username === "" || eventname === "")}
                        fullWidth
                        variant="contained"
                        color="primary"
                        preventDefault
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Check In
                    </Button>
                </form>
                <ToastContainer/>

            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}