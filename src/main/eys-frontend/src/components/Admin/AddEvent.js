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
import EventService from "../../services/event.service"

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
    const [firstLoad, setLoad] = React.useState(true);
    const [name, setName] = React.useState("");
    const [quota, setQuota] = React.useState(0);
    const [altitude, setAltitude] = React.useState(0.0);
    const [longitude, setLongitude] = React.useState(0.0);
    const [startDate, setStartDate] = React.useState("2020-01-01");
    const [endDate, setEndDate] = React.useState("2020-01-01");
    const [responseMessage, setResponseMessage] = React.useState("");

    const handleNameChange = event => setName(event.target.value);
    const handleQuotaChange = event => setQuota(event.target.value);
    const handleAltitudeChange = event => setAltitude(event.target.value);
    const handleLongitudeChange = event => setLongitude(event.target.value);
    const handleStartDateChange = event => setStartDate(event.target.value);
    const handleEndDateChange = event => setEndDate(event.target.value);

    const handleSubmit = variables => {
        const toInput = { name, quota, altitude, longitude, startDate: startDate, endDate: endDate };
        EventService.addEvent(toInput).then(response => console.log(response.data.message));
        setName("");
        setQuota(0);
        setLongitude(0);
        setAltitude(0);
    };

    if (firstLoad) {
        setLoad(false);
    }

    //Validation methods:
    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };
    const isLatitudeValid = (value) => {
        if (value< -90 || value > 90) {
            return (
                <div className="alert alert-danger" role="alert">
                    Latitude must be between -90 and 90
                </div>
            );
        }
    };
    const isLongitudeValid = (value) => {
        if (value< -180 || value > 180) {
            return (
                <div className="alert alert-danger" role="alert">
                    Longitude must be between -180 and 180
                </div>
            );
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    ADD A NEW EVENT
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Event Name"
                                value={name}
                                autoFocus
                                onChange={handleNameChange}

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
                                defaultValue="2020-01-01"
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
                                defaultValue="2020-01-01"
                                dateFormat={"yyyy-mm-dd"}
                                onChange={handleEndDateChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="quota"
                                value={quota}
                                label="Quota"
                                type="text"
                                pattern="[0-9]*"
                                id="quota"
                                onChange={handleQuotaChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="altitude"
                                label="Latitude"
                                value={altitude}
                                type="text"
                                pattern="[0-9]*"
                                id="altitude"
                                validations={[required, isLatitudeValid]}
                                onChange={handleAltitudeChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="longitude"
                                label="Longitude"
                                type="text"
                                pattern="[0-9]*"
                                id="longitude"
                                value={longitude}
                                validations={[required, isLongitudeValid]}
                                onChange={handleLongitudeChange}

                            />
                        </Grid>

                    </Grid>
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
                </form>


            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}