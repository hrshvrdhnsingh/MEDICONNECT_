/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import styles from "./MapBox.module.css";

import Pin from "./Pin";
//to create a promise, where the url recieved is the key
//const fetcher = (...args) => fetch(...args).then(response => response.json());

const MapBox = () => {
    //Setting up the view-port
    const [long, setLongitude] = useState(85.415374);
    const [lat, setLatitude] = useState(23.430642);
    const [hospitals, setHospitals] = useState([]);
    const [data, setData] = useState(null);
    const coordinatesArray = [
        { longitude: 85.1234, latitude: 23.5678, place: "marker1" },
        { longitude: 85.2345, latitude: 23.6789, place: "marker2" },
        { longitude: 85.3456, latitude: 23.789, place: "marker3" },
        // Add more elements as needed
    ];
    /*start of the new clustering experiment*/
    // const url =
    //   "api.geoapify.com/v2/places?categories=healthcare.hospital&bias=proximity:85.4399,23.4123&limit=20&apiKey=d548c5ed24604be6a9dd0d989631f783";

    // console.log(data);

    return (
        <div className="map-box">
            <Map
                mapboxAccessToken="pk.eyJ1IjoibWFwYm94LXZhcmRoYW4iLCJhIjoiY2x0NDY0MjBzMDlscTJrcDlid281a3kwMSJ9.77edNGadJdj6d5vcWk7DdA"
                initialViewState={{
                    longitude: long,
                    latitude: lat,
                    zoom: 8,
                    maxZoom: 16,
                }}
                mapStyle="mapbox://styles/mapbox/outdoors-v12"
                style={{ width: "100vw", height: "100vh" }}
                onViewportChange={(viewport) => {
                    setLatitude(viewport.latitude);
                    setLongitude(viewport.longitude);
                }}
                scrollZoom={true}
                dragPan={true}
                dragRotate={false}
                doubleClickZoom={true}
                touchZoom={true}
                touchRotate={false}
            >
                {coordinatesArray.map((coord, index, place) => (
                    <Marker
                        key={index}
                        latitude={coord.latitude}
                        longitude={coord.longitude}
                        className={styles.marker}
                    >
                        <Pin size={45} />
                    </Marker>
                ))}
            </Map>
        </div>
    );
};

export default MapBox;
