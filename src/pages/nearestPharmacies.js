import React, { useEffect, useState } from "react";
import { getNearbyPharmacies } from "../../lib/getNearbyPharmacies";
import Pin from "../../components/Pin";
import MapComponent from "../../components/GoogleMap";
import useTrackUserLocation from "../../hooks/trackUserLocation";

const FindNearestPharmacies = () => {
  const [pharmacyDetails, setPharmacyDetails] = useState([]);
  const coords = useTrackUserLocation();
  const { latitude, longitude } = coords;

  useEffect(() => {
    const fetchNearbyPharmacies = async () => {
      try {
        const pharmacies = await getNearbyPharmacies({ latitude, longitude });
        setPharmacyDetails(pharmacies);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setPharmacyDetails([]);
      }
    };

    if (coords) {
      fetchNearbyPharmacies();
    }
  }, [latitude, longitude]); // Add latitude and longitude to the dependency array

  const coordinatesArray = pharmacyDetails.map((pharmacy) => {
    return {
      lng: pharmacy.longitude,
      lat: pharmacy.latitude,
      name: pharmacy.name,
    };
  });

  return (
    <MapComponent
      locations={coordinatesArray}
      latitude={latitude}
      longitude={longitude}
    />
  );
};

export default FindNearestPharmacies;
