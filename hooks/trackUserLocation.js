import { useState, useEffect } from "react";

const useTrackUserLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    
    // console.log({ latitude });
    // console.log({ longitude });
    getLocation();

  }, []);

  

  return { latitude, longitude };
};

export default useTrackUserLocation;
