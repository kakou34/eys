import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from "react";

const LocationPin = ({ text }) => (
    <div className="pin">
        <LocationOnIcon className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
)
export default LocationPin