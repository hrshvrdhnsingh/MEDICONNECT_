/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from './Map.module.css'
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

const containerStyle = {
  width: "70vw",
  height: "78vh",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 1)",
};

// const locations = [rgba(0,0,0,1)
//   { lat: 23.4188084, lng: 85.4094945 }, // New York City
//   { lat: 23.4185097, lng: 85.4087648 }, // Los Angeles
//   { lat: 23.4275163, lng: 85.4120774 }, // Chicago
//   //   { lat: 29.7604, lng: -95.3698 }, // Houston
//   //   { lat: 33.4484, lng: -112.074 }, // Phoenix
// ];

function MapComponent({ locations, latitude, longitude }) {
  const [locationsLoaded, setLocationsLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (locations && locations.length > 0) {
      setLocationsLoaded(true);
    }
  }, [locations]);

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDR-y0GoIRS0dQVFlIsgVg7fkh5rA0sLAc", // Assuming you set the API key in an environment variable
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && map && locationsLoaded) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((point) => bounds.extend(point));
      map.fitBounds(bounds);
    }
  }, [isLoaded, map, locations, locationsLoaded]);

  const memoizedGoogleMap = useMemo(() => {
    return (
      <div className={styles.map_container}>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MarkerF
          position={center}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 4.25 7 13 7 13s7-8.75 7-13c0-3.87-3.13-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
            fillColor: "blue",
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 1.5,
          }}
          
        />
        {locations.map((point, i) => (
          <MarkerF
            key={i}
            position={point}
            icon={{
              path: "M12 2C8.13 2 5 5.13 5 9c0 4.25 7 13 7 13s7-8.75 7-13c0-3.87-3.13-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
              fillColor: "red",
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 1.2,
            }}
            onClick={() => setSelectedMarker(point)}
          >
            {selectedMarker === point && (
              <InfoWindowF position={point}>
                <div className={styles.inside_div}>
                  <h3>{point.name}</h3>
                  <p>{point.address}</p>
                  <p>
                    Distance : {parseFloat(parseInt(point.distance) / 1000)}km
                  </p>
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
      </div>
    );
  }, [onLoad, onUnmount, locations, center]);

  return isLoaded && locationsLoaded ? memoizedGoogleMap : null;
}

export default MapComponent;
