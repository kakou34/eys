import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/Common/Login";
import Register from "./components/Common/Register";
import Home from "./components/Common/Home";
import Profile from "./components/Common/Profile";
import BoardUser from "./components/User/BoardUser";
import BoardAdmin from "./components/Admin/BoardAdmin";
import ListItemsAdmin  from "./components/Admin/AdminSideBar";
import ListItemsUser from "./components/User/UserSideBar";
import AddEvent from "./components/Admin/AddEvent";
import AddAdmin from "./components/Admin/AddAdmin";
import EventsTable from "./components/Common/EventsTable";
import UpdateEvent from "./components/Admin/UpdateEvent";
import './App.css';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },


}));

export default function App() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.authorities.includes("ROLE_ADMIN"));
        }
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        AuthService.logout();
    };


    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                    <span>
                        {currentUser && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        ><MenuIcon/>
                        </IconButton>
                        )}
                        <Link to={"/home"} className="navlink">
                            HOME
                        </Link>
                    </span>
                        <span style={{ marginLeft: "auto", marginRight: -12 }}>
                            {currentUser ? (
                                <span>
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                    <a href="/login" className="nav-link" onClick={logOut}>
                                        Logout
                                    </a>
                                </span>
                            ) : (
                                <span>
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </span>
                            )}
                        </span>
                    </Toolbar>
                </AppBar>

                {currentUser && (
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>

                        {showAdminBoard ? (
                            <ListItemsAdmin/>
                        ) : (
                            <ListItemsUser/>
                        )}


                </Drawer>
                )}
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    <Typography align={"center"}>
                        <div className="container mt-3">
                            <Switch>
                                <Route exact path={["/", "/home"]} component={Home}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/profile" component={Profile}/>
                                <Route path="/user" component={BoardUser}/>
                                <Route path="/admin" component={BoardAdmin}/>
                                <Route path="/addEvent" component={AddEvent}/>
                                <Route path="/addAdmin" component={AddAdmin}/>
                                <Route path="/NextEventsList" component={(routeProps) => <EventsTable {...routeProps} isNext={true} />}/>
                                <Route path="/OldEventsList" component={() => <EventsTable isNext={false} />}/>
                                <Route path="/updateEvent/:eventName" component={UpdateEvent}/>
                            </Switch>
                        </div>
                    </Typography>
                </main>
            </div>
        </Router>
    );
}
