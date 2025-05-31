import React, { useState } from "react";
import styles from "../styles/medicineDetails.module.css";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Navbar from "../../components/Navbar/Navbar";
import PageLoader from "@/components/PageLoader/PageLoader";
import ProtectedRoute from "@/components/ProtectedRoute";

const MedicineDetails = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [medicineData, setMedicineData] = useState(null);
  const [medicineName, setMedicineName] = useState("");
  const [foundResults, setFoundResults] = useState("");
  const [loading, setLoading] = useState(false);

  const retrieveMedicineDetails = async () => {
    setLoading(true)
    const URL = `https://beta.myupchar.com/api/medicine/search?api_key=91f68f2d1f3fd3e6000a5c4b49fdb765&name=${medicineName}`;
    const details = await fetch(URL);

    if (details.ok) {
      const data = await details.json();
      const meddata = data.data || [];
      setMedicineData(meddata);
      setFoundResults(data.message);
    } else {
      setErrorMsg("Can't retrieve your required medicine");
      setFoundResults("Can't retrieve your required medicine");
    }
    setLoading(false);
  };

  return (
    <ProtectedRoute>
    <div className={styles.medicine_bg}>
      <Navbar />
      <div className="flex justify-center w-full">
        <form className="mt-24 w-4/12" onSubmit={(e) => {e.preventDefault(); retrieveMedicineDetails();}} >
          <div className="flex flex-wrap md:flex-nowrap gap-4 text-xl">
            <label className="w-full">
              <Input
                type="text"
                value={medicineName}
                label="Enter medicine name"
                onChange={(e) => setMedicineName(e.target.value)}
              />
            </label>
          </div>
        </form>
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          onClick={retrieveMedicineDetails}
          color="primary"
          className="flex justify-center text-xl px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-400 to-blue-700 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none ease-in-out duration-200 focus:ring-cyan-300 dark:focus:ring-cyan-800"
        >
          Retrieve Details
        </button>
      </div>

      <div className="flex justify-center min-h-max flex-wrap w-11/12 mt-8">
        {loading ? (<div className="fixed top-0 left-0 h-screen flex justify-center items-center bg-[#0116726b]"><PageLoader /></div>) : (
          <>
            {errorMsg && <p className="text-red-400 text-lg">{errorMsg}</p>}
            {foundResults && <div className="text-blue-200 text-lg">{foundResults}</div>}

            {medicineData && medicineData.length > 0 && (
              <div className="flex flex-wrap justify-center lg:gap-4 gap-4">
                {medicineData.map((medicine) => (
                  <div
                    key={medicine.product_id}
                    className="flex overflow-y-hidden items-center flex-col p-2 lg:w-[25%] w-[90%] gap-1 min-h-max bg-blue-300/20 backdrop-blur-lg rounded-2xl hover:border-blue-200 hover:border-2"
                  >
                    <p className="lg:text-2xl text-xl font-medium text-gray-300">
                      {medicine.name.length > 20 ? medicine.name.slice(0, 20) + "..." : medicine.name}
                    </p>
                    <p className="lg:text-xl text-lg text-teal-300">
                      Price : {medicine.price.final_price}
                    </p>
                    {medicine.form && (
                      <p className="text-gray-400">
                        Description : {medicine.form.length > 35 ? medicine.form.slice(0, 35) + "..." : medicine.form}
                      </p>
                    )}
                    <button
                      className="w-10/12 mt-auto flex justify-center text-xl px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-400 to-blue-700 hover:bg-gradient-to-bl focus:ring-1 ease-in-out duration-200 focus:ring-cyan-300 focus:outline-none dark:focus:ring-cyan-800"
                      onClick={() => window.open(medicine.product_url, "_blank")}
                    >
                      <p className="text-gray-300">Proceed to buy</p>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default MedicineDetails;
