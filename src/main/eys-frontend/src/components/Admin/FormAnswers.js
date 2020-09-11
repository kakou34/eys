import React from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import FeedbackService from "../../services/feedback.service";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";

const FormAnswers = () => {
    const eventName = useParams().eventName;
    const username = useParams().username;
    const [rows, updateRows] = React.useState([]);
    useEffect(() => {
        FeedbackService.getAnswers(eventName, username)
            .then(response => {
                console.log(response.data);
                updateRows(response.data);
            })
    }, [])
    return (


        <Container component="main" maxWidth="xs">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List component="nav" aria-label="main mailbox folders">
                        {rows.length !== 0 ?
                            rows.map(row => (
                                    <ListItem>
                                        <ListItemText secondary={row.question}/>
                                        <ListItemText primary={row.answer}/>
                                    </ListItem>
                                )
                            ) :
                            (
                                <h3>No answers submitted</h3>
                            )
                        }
                    </List>
                </Grid>

            </Grid>

        </Container>
    );

};

export default FormAnswers;
