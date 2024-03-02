import React, { useState } from "react";

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
    <>
      <div>
        <label>
          Enter medicine name:
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
        </label>
      </div>

      <button onClick={retrieveMedicineDetails}>Retrieve Details</button>

      {errorMsg && <p>{errorMsg}</p>}
      <div>{foundResults}</div>
      {medicineData && (
        <div>
          {medicineData.map((medicine) => (
            <div>
              <div key={medicine.id}>
                <p>{medicine.name}</p>
              </div>
              <div key={medicine.id}>
                <p>{medicine.price.mrp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MedicineDetails;
