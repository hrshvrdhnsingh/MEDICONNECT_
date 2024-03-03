import React, { useState } from "react";
import symptomsData from "../../data/SymptomsJSON.json";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../styles/diseasePrediction.module.css";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

export default function SymptomCheckbox() {
  const [checkedSymptoms, setCheckedSymptoms] = useState({});
  const [predictedDisease, setPredictedDisease] = useState(null);

  const handleCheckboxChange = (category, symptom, isChecked) => {
    setCheckedSymptoms((prevState) => ({
      ...prevState,
      [category]: {
        ...(prevState[category] || {}),
        [symptom]: isChecked,
      },
    }));
  };

  const handlePredict = async () => {
    try {
      const selectedSymptomsArray = [];
      for (const category in checkedSymptoms) {
        for (const symptom in checkedSymptoms[category]) {
          if (checkedSymptoms[category][symptom]) {
            selectedSymptomsArray.push(symptom);
          }
        }
      }
      console.log(selectedSymptomsArray);

      const symptomsArray = {
        list: selectedSymptomsArray,
      };

      const response = await axios.post(
        "https://diseasepredictionapi.onrender.com/Bs",
        symptomsArray
      );
      // console.log({ response });

      setPredictedDisease(response.data.Disease);
    } catch (error) {
      console.error("Network error:", error);
      // Handle the error here, such as displaying a message to the user
    }
  };

  const handleReset = () => {
    setCheckedSymptoms({});
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.bodyWrapper}>
        {Object.entries(symptomsData).map(([category, data]) => (
          <div className={styles.wrapper}>
            <div key={category}>
              <div className={styles.header_wrapper}>
                <div className={styles.design_header}>
                  <h2>{category}</h2>
                </div>
              </div>
              <div className={styles.full_wrapper}>
                <div className={styles.option_wrapper}>
                  {data.symptoms.map((symptom) => (
                    <div
                      key={Object.keys(symptom)[0]}
                      className={styles.checkboxWrapper}
                    >
                      {/* <input
                    type="checkbox"
                    id={Object.values(symptom)[0]}
                    checked={
                      checkedSymptoms[category]?.[Object.values(symptom)[0]] ||
                      false
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        category,
                        Object.values(symptom)[0],
                        e.target.checked
                      )
                    }
                  /> */}
                      <Checkbox
                        id={Object.values(symptom)[0]}
                        radius="md"
                        checked={
                          checkedSymptoms[category]?.[
                            Object.values(symptom)[0]
                          ] || false
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            category,
                            Object.values(symptom)[0],
                            e.target.checked
                          )
                        }
                      />

                      <label htmlFor={Object.values(symptom)[0]}>
                        {Object.keys(symptom)[0]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <button onClick={handlePredict}>Predict</button>
        <button onClick={handleReset}>Reset</button> */}
        <div className={styles.btnWrapper}>
          <Button
            onClick={handlePredict}
            color="primary"
            className={styles.btn_predict}
          >
            Predict disease
          </Button>
          <Button onClick={handleReset} color="primary" className={styles.btn}>
            Reset
          </Button>
        </div>

        {predictedDisease && (
          <div className={styles.disease_full_wrapper}>
            <div className={styles.disease_wrapper}>
              {predictedDisease && <div>You may have : </div>} 
              <div className={styles.disease}>{predictedDisease}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
