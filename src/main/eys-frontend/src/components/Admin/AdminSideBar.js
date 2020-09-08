import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import Divider from "@material-ui/core/Divider";
import List from '@material-ui/core/List';
import {Link} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const ListItemsAdmin = () => {
    return (
        <React.Fragment>
            <List>
                <ListItem button component={Link} to="/profile">
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItem>
                <ListItem button component={Link} to="/addEvent">
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Add An Event"/>
                </ListItem>
                <ListItem button component={Link} to="/NextEventsList">
                    <ListItemIcon>
                        <ListIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Event List"/>
                </ListItem>
                <ListItem button component={Link} to="/statistics">
                    <ListItemIcon>
                        <BarChartIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Statistics"/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListSubheader inset>More...</ListSubheader>
                <ListItem button component={Link} to={"/OldEventsList"}>
                    <ListItemIcon>
                        <ListIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Old Events"/>
                </ListItem>
                <ListItem button component={Link} to="/addAdmin">
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Add An Admin "/>
                </ListItem>
            </List>
        </React.Fragment>
    )
}
export default ListItemsAdmin;