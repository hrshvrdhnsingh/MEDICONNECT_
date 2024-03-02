import React, { useState } from "react";
import symptomsData from "../../data/SymptomsJSON.json";
import axios from "axios";

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
        "http://127.0.0.1:5000/Bs",
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
    <div>
      {Object.entries(symptomsData).map(([category, data]) => (
        <div key={category}>
          <h2>{category}</h2>
          {data.symptoms.map((symptom) => (
            <div key={Object.keys(symptom)[0]}>
              <input
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
              />
              <label htmlFor={Object.values(symptom)[0]}>
                {Object.keys(symptom)[0]}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handlePredict}>Predict</button>
      <button onClick={handleReset}>Reset</button>

      {predictedDisease && <div>{predictedDisease}</div>}
    </div>
  );
}
