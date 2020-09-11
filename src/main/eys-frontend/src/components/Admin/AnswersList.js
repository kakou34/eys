import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SurveyService from "../../services/survey.service";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const AnswersList = (props) => {
    const classes = useStyles();
    const [eventName, setEventName]= useState("");
    const [question, setQuestion]= useState("");
    const [rows, updateRows]= useState([]);
    useEffect(() => {
        setEventName(props.eventName);
        setQuestion(props.question);
        //update rows
        SurveyService.getAnswers(props.eventName, props.question).then(response => {
            updateRows(response.data);
        })
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {question}: Answers
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List component="nav" aria-label="main mailbox folders">
                            {(rows.length > 0 ) ? (
                                rows.map(row => (
                                    <div>
                                        <ListItem>
                                            <ListItemText primary={row.answer}/>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                ))
                            ) : (
                                <DialogContentText> No Answers Submitted Yet...</DialogContentText>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </div>
        </Container>

    );
};
export default AnswersList;
