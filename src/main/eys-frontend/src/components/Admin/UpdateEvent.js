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
import SurveyService from "../../services/survey.service";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useParams } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactDialog from "../Common/ReactDialog";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

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

export default function UpdateEvent(props) {
    const classes = useStyles();
    const eventName = useParams().eventName;
    const [name, setName] = React.useState("");
    const [quota, setQuota] = React.useState(0);
    const [altitude, setAltitude] = React.useState(0.0);
    const [longitude, setLongitude] = React.useState(0.0);
    const [startDate, setStartDate] = React.useState("2020-01-01");
    const [endDate, setEndDate] = React.useState("2020-01-01");
    const handleNameChange = event => setName(event.target.value);
    const handleQuotaChange = event => setQuota(event.target.value);
    const handleAltitudeChange = event => setAltitude(event.target.value);
    const handleLongitudeChange = event => setLongitude(event.target.value);
    const handleStartDateChange = event => setStartDate(event.target.value);
    const handleEndDateChange = event => setEndDate(event.target.value);

    const fQuestionDialogFields = [
        {id: "question", label: "Form Question", type: "text"},
    ]
    const sQuestionDialogFields = [
        {id: "question", label: "Survey Question", type: "text"},
    ]
    const [rows, updateRows] = React.useState([]);
    const [surveyRows, updateSurveyRows] = React.useState([]);
    const [isAddFQuestionModalOpen, updateIsAddFQuestionModalOpen] = React.useState(false);
    const [isAddSQuestionModalOpen, updateIsAddSQuestionModalOpen] = React.useState(false);
    const toggleAddFQuestionModal = () => {
        updateIsAddFQuestionModalOpen(!isAddFQuestionModalOpen);
    }
    const toggleAddSQuestionModal = () => {
        updateIsAddSQuestionModalOpen(!isAddSQuestionModalOpen);
    }

    const submitSurveyQuestionAdd = (inputData) => {
        toggleAddSQuestionModal();
        SurveyService.addQuestion(eventName, inputData)
            .then(response => {
                console.log(response.data);
                if (response.data.messageType === "SUCCESS") {
                    toast.success(response.data.message, toastOptions);
                    updateSurveyRows([...surveyRows, inputData]);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            });
    }

    const submitQuestionAdd = (inputData) => {
        toggleAddFQuestionModal();
        EventService.addQuestion(eventName, inputData)
            .then(response => {
                console.log(response.data);
                if (response.data.messageType === "SUCCESS") {
                    toast.success(response.data.message, toastOptions);
                    updateRows([...rows, inputData]);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            });
    }

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    const handleSubmit = () => {
        const toInput = { name, quota, altitude, longitude, startDate: startDate, endDate: endDate };
        EventService.updateEvent(eventName, toInput)
            .then(response => {
                console.log(response.data);
                if (response.data.messageType === "SUCCESS") {
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            });
        props.history.push('/updateEvent/' + name);
    };

    const onQuestionDelete = (eventName, question) => {
        EventService.deleteQuestion(eventName, question)
            .then(response => {
                console.log(response);
                if (response.data.messageType === "SUCCESS") {
                    updateRows(rows.filter((row) => row.question !== question));
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            })
    }

    const onSurveyQuestionDelete = (eventName, question) => {
        SurveyService.deleteQuestion(eventName, question)
            .then(response => {
                if (response.data.messageType === "SUCCESS") {
                    updateSurveyRows(surveyRows.filter((row) => row.question !== question));
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            })
    }


    useEffect(() => {
        axios.get("/events/" + encodeURIComponent(eventName), { headers: authHeader() })
            .then(response => {
                setName(response.data.name);
                setQuota(response.data.quota);
                setEndDate(response.data.endDate);
                setStartDate(response.data.startDate);
                setAltitude(response.data.altitude);
                setLongitude(response.data.longitude);
                //setLocation ({ address: 'Event Location', lat: response.data.altitude , lng: response.data.longitude});
            });
        EventService.getEventQuestion(eventName)
            .then(response => {
                console.log(response.data);
                updateRows(response.data);
            })

        SurveyService.getEventQuestion(eventName)
            .then(response => {
                console.log(response.data);
                updateSurveyRows(response.data)
            })


    }, [])

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Update Event
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={name === ""}
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
                                helperText={name === "" && "Name is required"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
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
                        <Grid item xs={12} sm={6} md={4} lg={4}>
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
                        <Grid item xs={12} md={4} lg={4}>
                            <TextField
                                error={ quota === '' || isNaN(quota) || quota < 0}
                                variant="outlined"
                                required
                                fullWidth
                                name="quota"
                                value={quota}
                                label="Quota"
                                type="number"
                                id="quota"
                                onChange={handleQuotaChange}
                                helperText={(quota === '' || isNaN(quota) || quota < 0) && "Quota is required and must be positive"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
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
                        <Grid item xs={12} sm={6} md={4} lg={4}>
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
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Button
                                disabled={(
                                    name === "" ||
                                    isNaN(quota) || quota < 0 || quota === "" ||
                                    isNaN(longitude) || longitude < -180 || longitude> 180 || longitude === "" ||
                                    isNaN(altitude) || altitude < -90 || altitude> 90 ) || altitude === ""}
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
            <Divider/>
            {/*<Map location={location} zoomLevel={17} />*/}
            <a href={"https://www.google.com/maps/search/?api=1&query="+ altitude +","+ longitude }  target="_blank" > View Event Location on Maps</a>

            <Divider/>
            <h3>Application Form Questions</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={toggleAddFQuestionModal}
                                    endIcon={<AddCircleOutlineIcon/>}
                                >
                                    Add Question
                                </Button>
                                <ReactDialog fields={fQuestionDialogFields} title="Add Form Question" isOpen={isAddFQuestionModalOpen}
                                             onClose={toggleAddFQuestionModal}
                                             onSubmit={submitQuestionAdd}/>
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
                                        onClick={() => onQuestionDelete(eventName, row.question)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider/>
            <h3>Survey Questions</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={toggleAddSQuestionModal}
                                    endIcon={<AddCircleOutlineIcon/>}
                                >
                                    Add Question
                                </Button>
                                <ReactDialog fields={sQuestionDialogFields} title="Add Survey Question" isOpen={isAddSQuestionModalOpen}
                                             onClose={toggleAddSQuestionModal}
                                             onSubmit={submitSurveyQuestionAdd}/>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {surveyRows.map((row) => (
                            <TableRow key={row.question}>
                                <TableCell component="th" scope="row">
                                    {row.question}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        aria-label={row.question}
                                        color="primary"
                                        onClick={() => onSurveyQuestionDelete(eventName, row.question)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}