import React, { useEffect, useState } from "react";
import { getNearbyPharmacies } from "../../lib/getNearbyPharmacies";
import MapComponent from "../../components/Map/GoogleMap";
import useTrackUserLocation from "../../hooks/trackUserLocation";
import Navbar from "../../components/Navbar/Navbar";
import PageLoader from "../../components/PageLoader/PageLoader"; // <-- Loader Component
import styles from "../styles/nearestHospitals.module.css"; // reuse CSS
import ProtectedRoute from "@/components/ProtectedRoute";

const FindNearestPharmacies = () => {
  const [pharmacyDetails, setPharmacyDetails] = useState([]);
  const [dataLoading, setDataLoading] = useState(false); // track fetch status
  const coords = useTrackUserLocation();
  const { latitude, longitude } = coords;

  useEffect(() => {
    const fetchNearbyPharmacies = async () => {
      setDataLoading(true);
      try {
        const pharmacies = await getNearbyPharmacies({ latitude, longitude });
        setPharmacyDetails(pharmacies);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setPharmacyDetails([]);
      } finally {
        setDataLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchNearbyPharmacies();
    }
  }, [latitude, longitude]);

  const coordinatesArray = pharmacyDetails.map((pharmacy) => ({
    lng: pharmacy.longitude,
    lat: pharmacy.latitude,
    name: pharmacy.name,
    address: pharmacy.address,
    distance: pharmacy.distance,
  }));

  const shouldShowLoader = !latitude || !longitude || dataLoading;

  return (
    <ProtectedRoute>
    <div className={styles.extra_bg}>
      <Navbar />

      {/* Loader Overlay */}
      {shouldShowLoader && (
        <div className='fixed top-0 left-0 flex justify-center items-center w-screen h-screen  bg-[#0116726b] z-[120]'>
          <PageLoader />
        </div>
      )}

      {!shouldShowLoader && (
        <MapComponent
          locations={coordinatesArray}
          latitude={latitude}
          longitude={longitude}
        />
      )}
      {
        !shouldShowLoader && (
          <div className="flex flex-col gap-8">
            <p className="text-4xl text-blue-400 font-semibold">Quick access to nearby care</p>
            <p className="text-gray-300 text-md">* Tap on pointer to expand the address</p>
          </div>
        )
      }
    </div>
    </ProtectedRoute>
  );
};

export default FindNearestPharmacies;
