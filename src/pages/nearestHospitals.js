import React, { useEffect, useState } from "react";
import { getNearbyHospitals } from "../../lib/getNearbyHospitals";
import Pin from "../../components/Pin";
import MapComponent from "../../components/Map/GoogleMap";
import useTrackUserLocation from "../../hooks/trackUserLocation";
import Navbar from "../../components/Navbar/Navbar"

const FindNearestHospitals = () => {
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const coords = useTrackUserLocation();
  // console.log({coords});
  const { latitude, longitude } = coords;

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      try {
        const hospitals = await getNearbyHospitals({ latitude, longitude });
        setHospitalDetails(hospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setHospitalDetails([]);
      }
    };

    if (coords) {
      fetchNearbyHospitals();
    }
  }, [latitude, longitude]);

  const coordinatesArray = hospitalDetails.map((hospital) => {
    return {
      lng: hospital.longitude,
      lat: hospital.latitude,
      name: hospital.name,
      address: hospital.address,
      distance: hospital.distance
    };
  });

  return (
    <>  
      <Navbar />
      <MapComponent
        locations={coordinatesArray}
        latitude={latitude}
        longitude={longitude}
      />
    </>
  );
};

export default FindNearestHospitals;
