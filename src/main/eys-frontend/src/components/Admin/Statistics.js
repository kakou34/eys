import React, {useEffect} from 'react';
import Divider from "@material-ui/core/Divider";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {ToastContainer} from "react-toastify";
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Copyright from "../Common/Copyright";
import PaginationTable from "../table/PaginationTable";
import BarChartDialog from "../BarChart/BarChartDialog";
import BarChart from "../BarChart/BarChart";
import FeedbackService from "../../services/feedback.service"
import EventService from "../../services/event.service";

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

export default function Statistics() {
    const classes = useStyles();
    const [data, updateData] = React.useState([]);
    const [rows, updateRows] = React.useState([]);
    const [dialogRows, updateDialogRows] = React.useState([]);
    const [isDialogOpen, updateIsDialogOpen] = React.useState(false);

    const onShowEventStats = (eventName) => {
        FeedbackService.getEventSubmissionsPerDay(eventName)
            .then(response => {
                let newRows = [];
                console.log(response.data);
                response.data.map(row => (
                    newRows.push(
                        { name: row.day , value: row.submissionCount },
                    )
                ));
                updateDialogRows(newRows);
            })
        toggleDialog();
    }
    const eventsTableColumns = [
        {id: 'name', label: 'Event Name', minWidth: 170},
        {id: "statistics", label: "Event Statistics", align: "right", onClick: onShowEventStats},
    ];

    const toggleDialog = () => {
        updateIsDialogOpen(!isDialogOpen);
    }

    useEffect(() => {
        FeedbackService.getSubmissionsPerEvent()
            .then(response => {
                let newRows = [];
                response.data.map(row => (
                    newRows.push(
                        { name: row.eventName , value: row.submissionCount },
                        )
                ));
                updateData(newRows);
            })

        EventService.getAll()
            .then(response => {
                updateRows(response.data)
            });

    }, [])

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <BarChart rows ={data} title = "Submissions Per Event"/>
            </div>
            <Divider/>
            <h3>Statistics Per Event</h3>
            <div>
                <Container maxWidth={"sm"}>
                    <PaginationTable rows={rows} columns={eventsTableColumns}/>
                </Container>
                <ToastContainer/>
            </div>
            <BarChartDialog rows={dialogRows} isOpen={isDialogOpen} onClose={toggleDialog}/>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}