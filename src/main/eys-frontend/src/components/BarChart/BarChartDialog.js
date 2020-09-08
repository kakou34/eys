import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from "@material-ui/core/Button";
import BarChart from "./BarChart";

export default function BarChartDialog(props) {
    console.log(props.rows);
    return (
        <div>
            <Dialog
                open={props.isOpen}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Event Applications Per Day"}</DialogTitle>
                <DialogContent>
                    {(props.rows.length > 0) ? (<BarChart rows = { props.rows } title =""/>) : (
                        <DialogContentText id="alert-dialog-description">
                            There is no data available for this event. No Applications were made.
                        </DialogContentText>
                    ) }
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}