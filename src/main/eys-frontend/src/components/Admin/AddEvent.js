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
import EventService from "../../services/event.service";
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
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const today = "" + year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2) ;
    const [firstLoad, setLoad] = React.useState(true);
    const [name, setName] = React.useState("");
    const [quota, setQuota] = React.useState(0);
    const [altitude, setAltitude] = React.useState(0.0);
    const [longitude, setLongitude] = React.useState(0.0);
    const [startDate, setStartDate] = React.useState(today);
    const [endDate, setEndDate] = React.useState(today);
    const handleNameChange = event => setName(event.target.value);
    const handleQuotaChange = event => setQuota(event.target.value);
    const handleAltitudeChange = event => setAltitude(event.target.value);
    const handleLongitudeChange = event => setLongitude(event.target.value);
    const handleStartDateChange = event => setStartDate(event.target.value);
    const handleEndDateChange = event => setEndDate(event.target.value);

    const handleSubmit = e => {
            const toInput = {name, quota, altitude, longitude, startDate: startDate, endDate: endDate};
            EventService.addEvent(toInput).then(response => {
                if (response.data.messageType === "SUCCESS") {
                    setName("");
                    setQuota(0);
                    setLongitude(0);
                    setAltitude(0);
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            });
    };

    if (firstLoad) {
        setLoad(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    ADD A NEW EVENT
                </Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={name === ""}
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Event Name"
                                value={name}
                                autoFocus
                                onChange={handleNameChange}
                                helperText={name === "" && "Name is required"}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="startDate"
                                label="Start Date"
                                name="startDate"
                                value={startDate}
                                autoComplete="startDate"
                                type="date"
                                defaultValue={today}
                                dateFormat={"yyyy-mm-dd"}
                                onChange={handleStartDateChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="endDate"
                                label="End Date"
                                name="endDate"
                                value={endDate}
                                autoComplete="endDate"
                                type="date"
                                defaultValue={today}
                                dateFormat={"yyyy-mm-dd"}
                                onChange={handleEndDateChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={ quota === '' || isNaN(quota) || quota < 0}
                                variant="outlined"
                                required
                                fullWidth
                                name="quota"
                                value={quota}
                                label="Quota"
                                type="text"
                                id="quota"
                                onChange={handleQuotaChange}
                                helperText={(quota === '' || isNaN(quota) || quota < 0) && "Quota is required and must be positive"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={altitude === '' || isNaN(altitude) || altitude < -90 || altitude> 90}
                                variant="outlined"
                                required
                                fullWidth
                                name="altitude"
                                label="Latitude"
                                value={altitude}
                                type="number"
                                id="altitude"
                                onChange={handleAltitudeChange}
                                helperText={(altitude === '' || isNaN(altitude) || altitude < -90 || altitude> 90)
                                                && "Latitude must be a number between -90 and 90"
                                            }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={longitude === '' || isNaN(longitude) || longitude < -180 || longitude> 180}
                                variant="outlined"
                                required
                                fullWidth
                                name="longitude"
                                label="Longitude"
                                type="number"
                                id="longitude"
                                value={longitude}
                                onChange={handleLongitudeChange}
                                helperText={(longitude === '' || isNaN(longitude) || longitude < -180 || longitude> 180)
                                && "Longitude must be a number between -180 and 180"
                                }
                            />

                        </Grid>

                    </Grid>
                    <Button
                        disabled={(
                            name === "" ||
                            isNaN(quota) || quota < 0 ||
                            isNaN(longitude) || longitude < -180 || longitude> 180 ||
                            isNaN(altitude) || altitude < -90 || altitude> 90 )}
                        fullWidth
                        variant="contained"
                        color="primary"
                        preventDefault
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Save
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