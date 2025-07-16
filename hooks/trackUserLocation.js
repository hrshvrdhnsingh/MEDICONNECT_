import { useState, useEffect } from "react";

const useTrackUserLocation = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) { // If the browser supports it, permission will be needed and then just map it.
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                    }
                );
            } 
            else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        getLocation();
    }, []);

    return { latitude, longitude };
};

export default useTrackUserLocation;
