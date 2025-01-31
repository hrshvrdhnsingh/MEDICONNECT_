import React, { useState } from "react";
import styles from "../styles/medicineDetails.module.css";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Navbar from "../../components/Navbar/Navbar";

const MedicineDetails = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [medicineData, setMedicineData] = useState(null);
  const [medicineName, setMedicineName] = useState("");
  const [foundResults, setFoundResults] = useState("");

  const retrieveMedicineDetails = async () => {
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
  };

  return (
    <div className={styles.medicine_bg}>
      <Navbar />
      <div className="flex justify-center">
        <div className="mt-24">
          {/* <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          /> */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 text-xl">
            <label>
              <Input
                type="text"
                value={medicineName}
                label="Enter medicine name"
                onChange={(e) => setMedicineName(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>

      {/* <button onClick={retrieveMedicineDetails}>Retrieve Details</button> */}
      <div className="flex justify-center mt-4">
        <Button
          onClick={retrieveMedicineDetails}
          color="primary"
          className={styles.btn}
        >
          Retrieve Details
        </Button>
      </div>

      <div className="flex justify-center min-h-max flex-wrap w-11/12 mt-8">
        {errorMsg && <p>{errorMsg}</p>}
          <div className="text-blue-200 text-lg">{foundResults}</div>
             {medicineData && ( 
        <div className="flex flex-wrap justify-center gap-4">
          {medicineData.map((medicine) => (
            <div key={medicine.product_id} className="flex items-center flex-col p-2 w-[25%] h-[25vh] bg-blue-300/20 backdrop-blur-lg rounded-2xl hover:border-teal-200 hover:border-2">
              <p className="text-2xl font-medium text-gray-300">{medicine.name}</p>
              <p className="text-xl text-teal-300">Price : {medicine.price.mrp}</p>
              {medicine.form && <p className="text-gray-400">Description : {medicine.form}</p>}
              <button className={styles.buybtn} onClick={() => window.open(medicine.product_url, "_blank")}>
                Proceed to buy
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default MedicineDetails;
