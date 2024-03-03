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
    <div>
      <Navbar />
      <div className={styles.inputWrapper}>
        <div>
          {/* <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          /> */}
          <div className="flex flex-wrap md:flex-nowrap gap-4">
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
      <div className={styles.btnWrapper}>
        <Button
          onClick={retrieveMedicineDetails}
          color="primary"
          className={styles.btn}
        >
          Retrieve Details
        </Button>
      </div>

      <div className={styles.outer_container}>
        {errorMsg && <p>{errorMsg}</p>}
          <div>{foundResults}</div>
             {medicineData && (
        <div className={styles.medicine_container}>
          {medicineData.map((medicine) => (
            <div key={medicine.product_id} className={styles.medicine_box}>
              <p className={styles.title}>{medicine.name}</p>
              <p className={styles.price}>Price : {medicine.price.mrp}</p>
              {medicine.form && <p className={styles.formtype}>Description : {medicine.form}</p>}
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
