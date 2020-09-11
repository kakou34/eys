import React from 'react';
import {useState, useEffect} from "react";
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import AuthService from "./services/auth.service";
import SocketService from "./services/socket.service";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
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
import ApplicationForm from "./components/User/ApplicationForm";
import ImageViewerSender from "./components/User/ImageViewerSender";
import FormAnswers from "./components/Admin/FormAnswers";
import UsersTable from "./components/Admin/UsersTable";
import Statistics from "./components/Admin/Statistics";
import CheckIn from "./components/Admin/CheckIn";
import Giveaway from "./components/Admin/Giveaway";
import OngoingEventsTable from "./components/Common/OngoingEventsTable";
import InstantQuestions from "./components/Admin/InstantQuestions";
import OldEvents from "./components/User/OldEvents";
import SurveyForm from "./components/User/SurveyForm";
import './style/App.css';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const drawerWidth = 240;
const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
};

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
            if(user.authorities.includes("ROLE_ADMIN")) {
                let socket = new SockJS('/eys');
                let stompClient = Stomp.over(socket);
                stompClient.connect({}, function (frame) {
                    stompClient.subscribe('/topic/newNotification', function (notification) {
                        toast.info( notification.body , toastOptions);
                    });
                    stompClient.subscribe('/topic/newMessage', function (message) {
                        toast.info( "Event " + message.body + " has a new message" , toastOptions);
                    });
                });
            } else {
                SocketService.connectUser();
            }
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
        SocketService.disconnect();
    };



    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <ToastContainer/>
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
                        <Link to={"/home"} className={"navigationBtn"}>
                            HOME
                        </Link>
                    </span>
                        <span style={{ marginLeft: "auto", marginRight: -12 }}>
                            {currentUser ? (
                                <span>
                                    <Link to={"/profile"} className="navigationBtn">
                                        {currentUser.username}
                                    </Link>
                                    <a href="/login" className="navigationBtn" onClick={logOut}>
                                        Logout
                                    </a>
                                </span>
                            ) : (
                                <span>
                                    <Link to={"/login"} className="navigationBtn">
                                        Login
                                    </Link>
                                    <Link to={"/register"} className="navigationBtn">
                                        Sign Up
                                    </Link>
                                </span>
                            )}
                        </span>
                    </Toolbar>
                </AppBar>

                {/*{ currentUser && (*/}
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
                {/*)}*/}
                <main className={clsx(classes.content, {[classes.contentShift]: open,})} >
                    <div className={classes.drawerHeader}/>
                    <Typography align={"center"}>
                        <div className="container mt-3">
                            <Switch>
                                <Route exact path={["/", "/home"]} component={Home}/>
                                {!currentUser && <Route exact path="/login" component={Login}/>}
                                {!currentUser && <Route exact path="/register" component={Register}/>}
                                <Route exact path="/profile" component={Profile}/>
                                <Route path="/user" component={BoardUser}/>
                                <Route path="/admin" component={BoardAdmin}/>
                                <Route path="/addEvent" component={AddEvent}/>
                                <Route path="/addAdmin" component={AddAdmin}/>
                                <Route path="/NextEventsList" component={(routeProps) => <EventsTable {...routeProps} isNext={true} isAdmin = {showAdminBoard } /> } />
                                <Route path="/OldEventsList" component={() => <EventsTable isNext={false}  isAdmin = {showAdminBoard}/>}/>
                                <Route path="/availableEvents" component={(routeProps) => <EventsTable {...routeProps} isNext={true} isAdmin = {showAdminBoard} /> } />
                                <Route path="/updateEvent/:eventName" component={UpdateEvent}/>
                                <Route path="/apply/:eventName" component={(routeProps) => <ApplicationForm {...routeProps} /> } />
                                <Route path="/survey/:eventName" component={(routeProps) => <SurveyForm {...routeProps} /> } />
                                <Route path="/applicants/:eventName" component={(routeProps) => <UsersTable {...routeProps} /> } />
                                <Route path="/answers/:eventName/:username" component={FormAnswers}/>
                                <Route path="/image/:eventName/:imgType" component={ImageViewerSender} />
                                <Route path="/statistics" component={Statistics}/>
                                <Route path="/checkIn" component={CheckIn}/>
                                <Route path="/giveaway" component={Giveaway}/>
                                <Route path="/instantQuestions" component={InstantQuestions}/>
                                <Route path="/userOldEvents" component={OldEvents}/>
                                <Route path="/ongoingEvents" component={() => <OngoingEventsTable isAdmin = {showAdminBoard}/>}/>
                            </Switch>
                        </div>
                    </Typography>
                </main>
            </div>
        </Router>
    );
}
