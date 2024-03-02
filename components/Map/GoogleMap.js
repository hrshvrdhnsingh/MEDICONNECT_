/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "60vw",
  height: "70vh",
};

// const locations = [
//   { lat: 23.4188084, lng: 85.4094945 }, // New York City
//   { lat: 23.4185097, lng: 85.4087648 }, // Los Angeles
//   { lat: 23.4275163, lng: 85.4120774 }, // Chicago
//   //   { lat: 29.7604, lng: -95.3698 }, // Houston
//   //   { lat: 33.4484, lng: -112.074 }, // Phoenix
// ];

function MapComponent({ locations, latitude, longitude}) {
  const [locationsLoaded, setLocationsLoaded] = useState(false);

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
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
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
          ></MarkerF>
        ))}
      </GoogleMap>
    );
  }, [onLoad, onUnmount, locations, center]);

  return isLoaded && locationsLoaded ? memoizedGoogleMap : null;
}

export default MapComponent;
