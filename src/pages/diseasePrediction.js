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
    <div className={styles.prediction_bg}>
      <Navbar />
      <div className="flex justify-center items-center mt-16 flex-col">
        {Object.entries(symptomsData).map(([category, data]) => (
          <div className="w-[80vw] mt-8 px-4 py-3 bg-blue-300/20 backdrop-blur-xl rounded-2xl">
            <div key={category}>
              <div className="flex justify-center">
                <div className="flex justify-center text-xl bg-blue-300 px-3 py-2 rounded-xl text-gray-200">
                  <h2>{category}</h2>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="flex flex-wrap justify-center w-full">
                  {data.symptoms.map((symptom) => (
                    <div
                      key={Object.keys(symptom)[0]}
                      className="bg-gray-200 flex min-w-max text-medium rounded-xl px-2 py-1 mx-2 my-2 text-black"
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
        <div className="flex justify-center m-8 gap-4">
          <Button
            onClick={handlePredict}
            color="primary"
            className="text-2xl p-4 hover:scale-95"
          >
            Predict disease
          </Button>
          <Button onClick={handleReset} color="primary" className="text-2xl p-4 hover:scale-95">
            Reset
          </Button>
        </div>

        {predictedDisease && (
          <div className="flex justify-center">
            <div className="flex justify-center items-center gap-4">
              {predictedDisease && <div className="text-xl text-blue-300 font-medium">You may have : </div>} 
              <div className="text-4xl text-gray-300">{predictedDisease}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
