import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import AuthService from "../../services/auth.service";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";


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


const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {currentUser.username} Profile
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemText primary="Firstname:"/>
                                <ListItemText secondary={currentUser.firstname}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Lastname:"/>
                                <ListItemText secondary={currentUser.lastname}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary="Email:"/>
                                <ListItemText secondary={currentUser.email}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Turkish ID:"/>
                                <ListItemText secondary={currentUser.turkishID}/>
                            </ListItem>
                        </List>
                    </Grid>

                </Grid>
            </div>
        </Container>

    );
};

export default Profile;
