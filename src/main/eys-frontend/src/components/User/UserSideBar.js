import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListIcon from "@material-ui/icons/List";
import {Divider} from "@material-ui/core";
import List from '@material-ui/core/List';
import { Link } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';


const ListItemsUser = () => {
    return (
        <React.Fragment>
            <List>
                <ListItem button component={Link} to="/profile">
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItem>
                <ListItem button component={Link} to={"/availableEvents"}>
                    <ListItemIcon>
                        <ListIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Available Events"/>
                </ListItem>
                <ListItem button component={Link} to="/ongoingEvents">
                    <ListItemIcon>
                        <QueryBuilderIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Ongoing Events"/>
                </ListItem>
                {/*<ListItem button>*/}
                {/*    <ListItemIcon>*/}
                {/*        <BarChartIcon/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Upcoming Events"/>*/}
                {/*</ListItem>*/}
            </List>
            <Divider/>
            <List>
                <ListSubheader inset>More...</ListSubheader>
                {/*<ListItem button>*/}
                {/*    <ListItemIcon>*/}
                {/*        <ListIcon/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="My Old Events"/>*/}
                {/*</ListItem>*/}
            </List>
        </React.Fragment>
    );
}

export default ListItemsUser;
