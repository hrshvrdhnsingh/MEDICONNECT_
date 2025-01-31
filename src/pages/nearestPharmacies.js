import React, { useEffect, useState } from "react";
import { getNearbyPharmacies } from "../../lib/getNearbyPharmacies";
import MapComponent from "../../components/Map/GoogleMap";
import useTrackUserLocation from "../../hooks/trackUserLocation";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../styles/nearestHospitals.module.css";

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
      address: pharmacy.address,
      distance: pharmacy.distance,
    };
  });

  return (
    <div className={styles.extra_bg}>
      <Navbar />
      <MapComponent locations={coordinatesArray} latitude={latitude} longitude={longitude}/>
    </div>
  );
};

export default FindNearestPharmacies;
