import React, { useEffect, useState } from "react";
import { getNearbyHospitals } from "../../lib/getNearbyHospitals";
import MapComponent from "../../components/Map/GoogleMap";
import useTrackUserLocation from "../../hooks/trackUserLocation";
import Navbar from "../../components/Navbar/Navbar";
import PageLoader from "../../components/PageLoader/PageLoader";
import styles from "../styles/nearestHospitals.module.css";
import ProtectedRoute from "@/components/ProtectedRoute";

const FindNearestHospitals = () => {
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const coords = useTrackUserLocation();
  const { latitude, longitude } = coords;

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      setDataLoading(true); // Start loader

      try {
        const hospitals = await getNearbyHospitals({ latitude, longitude });
        setHospitalDetails(hospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setHospitalDetails([]);
      } finally {
        setDataLoading(false); // Stop loader
      }
    };

    if (latitude && longitude) {
      fetchNearbyHospitals();
    }
  }, [latitude, longitude]);

  const coordinatesArray = hospitalDetails.map((hospital) => ({
    lng: hospital.longitude,
    lat: hospital.latitude,
    name: hospital.name,
    address: hospital.address,
    distance: hospital.distance,
  }));

  const shouldShowLoader = !latitude || !longitude || dataLoading;

  return (
    <ProtectedRoute>
    <div className={styles.extra_bg}>
      <Navbar />

      {/* ✅ Loader only when coordinates or data aren't ready */}
      {shouldShowLoader && (
        <div className='fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-[#0116726b] z-[120]'>
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
          <div className="flex flex-col gap-3">
            <p className="text-4xl text-blue-400 font-semibold">Nearby hospitals at a glance</p>
            <p className="text-gray-300 text-md">* Tap on pointer to expand the address</p>
          </div>
        )
      }
    </div>
    </ProtectedRoute>
  );
};

export default FindNearestHospitals;
