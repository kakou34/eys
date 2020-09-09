import React from 'react';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import TouchAppIcon from '@material-ui/icons/TouchApp';
import RoomIcon from '@material-ui/icons/Room';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import ChatIcon from '@material-ui/icons/Chat';

export default function TableContent(props) {

  let iconMap = {
    "update": <CreateIcon/>,
    "delete": <DeleteIcon/>,
    "apply":  <TouchAppIcon/>,
    "location": <RoomIcon/>,
    "applicants": <PeopleAltIcon/>,
    "answers": <AssignmentIcon/>,
    "statistics": <BarChartIcon/>,
    "message": <ChatIcon/>,
  }

  return (
    <TableBody>
      {getRowSlice().map(row => createTableRow(row))}
    </TableBody>

  );

  function getRowSlice() {
    return props
      .rows
      .slice(calculatePageBeginning(), calculatePageEnd());
  }

  function calculatePageBeginning() {
    return props.page * props.rowsPerPage;
  }

  function calculatePageEnd() {
    return props.page * props.rowsPerPage + props.rowsPerPage;
  }


  function createTableRow(row) {
    return (
      <TableRow hover role="checkbox" key={row.name}>
        {props.columns.map(column => createTableCell(column, row))}
      </TableRow>
    );
  }

  function createTableCell(column, row) {
    let cellValue = row[column.id];
    if (column.id === "update" || column.id === "delete" || column.id === "apply" || column.id === "applicants" || column.id === "statistics" || column.id === "message") {
      cellValue = createIcon(column.id, column.onClick, row.name);
    }
    if(column.id === "location") {
      cellValue = createLocationIcon(column.id, column.onClick, row.altitude,row.longitude);
    }
    if(column.id === "answers") {
      cellValue = createAnswersIcon(column.id, column.onClick, row.username);
    }


    return (
      <TableCell key={column.id} align={column.align}>
        {cellValue}
      </TableCell>
    );
  }

  function createIcon(key, onClick, eventName) {
    return (
      <IconButton aria-label={key} color="primary" onClick={() => onClick(eventName)}>
        {iconMap[key]}
      </IconButton>
    )
  }


  function createLocationIcon(key, onClick, altitude, longitude) {
    return (
        <IconButton aria-label={key} color="primary" onClick={() => onClick(altitude, longitude)}>
          {iconMap[key]}
        </IconButton>
    )
  }

  function createAnswersIcon(key, onClick, username) {
    return (
        <IconButton aria-label={key} color="primary" onClick={() => onClick(username)}>
          {iconMap[key]}
        </IconButton>
    )
  }



}