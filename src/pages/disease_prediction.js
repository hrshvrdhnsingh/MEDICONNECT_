import React from "react";
import axios from "axios";
import { useState } from "react";

const symptomsArray = {
  list: [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "vomiting",
    "fatigue",
    "weight_gain",
  ],
};

export async function getServerSideProps() {
  let predicted_disease = "";
  const response = await axios.post("http://127.0.0.1:5000/Bs", symptomsArray);
  // console.log({response});
  if (response.statusText === 'OK') {
    predicted_disease = response.data.Disease;
    console.log({ predicted_disease });
  }
  return {
    props: {
      predicted_disease,
    },
  };
}

const diseasePrediction = ({predicted_disease}) => {
  return <div>{predicted_disease}</div>;
};

export default diseasePrediction;
