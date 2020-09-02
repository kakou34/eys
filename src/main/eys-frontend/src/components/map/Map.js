import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from "./LocationPin";
import "../../style/Map.css"

const Map = ({ location, zoomLevel }) => (
    <div className="map">
        <h2 className="map-h2">Event Location</h2>
        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBaNXEjdxneg6-T518QI3xezqfBFzO9m-8' }}
                center={location}
                defaultZoom={zoomLevel}
            >
                <LocationPin
                    lat={location.lat}
                    lng={location.lng}
                />
            </GoogleMapReact>
        </div>
    </div>
)
export default Map