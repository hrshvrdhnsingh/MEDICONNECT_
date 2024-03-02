import React, { useEffect, useState } from "react";
import nutritionDetails from "../../data/nutritionDetails.json";

const NutritionChart = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isNonVegetarian, setIsNonVegetarian] = useState(false);
  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [snacks, setSnacks] = useState(null);
  const [dinner, setDinner] = useState(null);

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const handleVegetarianChange = (e) => {
    setIsVegetarian(e.target.checked);
    if (e.target.checked) {
      setIsNonVegetarian(false);
    }
  };

  const handleNonVegetarianChange = (e) => {
    setIsNonVegetarian(e.target.checked);
    if (e.target.checked) {
      setIsVegetarian(false);
    }
  };

  const calculateBMI = () => {
    const heightMeters = height / 100;
    const bmiValue = weight / (heightMeters * heightMeters); // BMI formula
    setBMI(bmiValue.toFixed(2));
  };

  const prepareDietChart = () => {
  if (bmi < 18.5) {
    if (isVegetarian) {
      setBreakfast(nutritionDetails.diet_plan.Weight_Gain.veg.breakfast);
      setLunch(nutritionDetails.diet_plan.Weight_Gain.veg.lunch);
      setSnacks(nutritionDetails.diet_plan.Weight_Gain.veg.snacks);
      setDinner(nutritionDetails.diet_plan.Weight_Gain.veg.dinner);
    } else if (isNonVegetarian) {
      setBreakfast(nutritionDetails.diet_plan.Weight_Gain['non-veg'].breakfast);
      setLunch(nutritionDetails.diet_plan.Weight_Gain['non-veg'].lunch);
      setSnacks(nutritionDetails.diet_plan.Weight_Gain['non-veg'].snacks);
      setDinner(nutritionDetails.diet_plan.Weight_Gain['non-veg'].dinner);
    }
  } else if (bmi >= 18.5 && bmi < 25) {
    if (isVegetarian) {
      setBreakfast(nutritionDetails.diet_plan.Maintenance.veg.breakfast);
      setLunch(nutritionDetails.diet_plan.Maintenance.veg.lunch);
      setSnacks(nutritionDetails.diet_plan.Maintenance.veg.snacks);
      setDinner(nutritionDetails.diet_plan.Maintenance.veg.dinner);
    } else if (isNonVegetarian) {
      setBreakfast(nutritionDetails.diet_plan.Maintenance['non-veg'].breakfast);
      setLunch(nutritionDetails.diet_plan.Maintenance['non-veg'].lunch);
      setSnacks(nutritionDetails.diet_plan.Maintenance['non-veg'].snacks);
      setDinner(nutritionDetails.diet_plan.Maintenance['non-veg'].dinner);
    }
  } else if (bmi >= 25 && bmi <= 30) {
    if (isVegetarian) {
      setBreakfast(nutritionDetails.diet_plan.Weight_Loss.veg.breakfast);
      setLunch(nutritionDetails.diet_plan.Weight_Loss.veg.lunch);
      setSnacks(nutritionDetails.diet_plan.Weight_Loss.veg.snacks);
      setDinner(nutritionDetails.diet_plan.Weight_Loss.veg.dinner);
    } else if (isNonVegetarian) {
      setBreakfast(nutritionDetails.diet_plan.Weight_Loss['non-veg'].breakfast);
      setLunch(nutritionDetails.diet_plan.Weight_Loss['non-veg'].lunch);
      setSnacks(nutritionDetails.diet_plan.Weight_Loss['non-veg'].snacks);
      setDinner(nutritionDetails.diet_plan.Weight_Loss['non-veg'].dinner);
    }
  } else if (bmi > 30) {
    if (isVegetarian) {
      setBreakfast(nutritionDetails.diet_plan.Losing_Excessive_Weight.veg.breakfast);
      setLunch(nutritionDetails.diet_plan.Losing_Excessive_Weight.veg.lunch);
      setSnacks(nutritionDetails.diet_plan.Losing_Excessive_Weight.veg.snacks);
      setDinner(nutritionDetails.diet_plan.Losing_Excessive_Weight.veg.dinner);
    } else if (isNonVegetarian) {
      setBreakfast(nutritionDetails.diet_plan.Losing_Excessive_Weight['non-veg'].breakfast);
      setLunch(nutritionDetails.diet_plan.Losing_Excessive_Weight['non-veg'].lunch);
      setSnacks(nutritionDetails.diet_plan.Losing_Excessive_Weight['non-veg'].snacks);
      setDinner(nutritionDetails.diet_plan.Losing_Excessive_Weight['non-veg'].dinner);
    }
  }
};


  return (
    <>
      <div>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isVegetarian}
            onChange={handleVegetarianChange}
          />
          Vegetarian
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isNonVegetarian}
            onChange={handleNonVegetarianChange}
          />
          Non-Vegetarian
        </label>
      </div>
      <button onClick={prepareDietChart}>Prepare Diet Chart</button>

      <div>Breakfast</div>
      {breakfast && (
        <div>
          {breakfast.options.map((option, index) => (
            <div key={index}>
              <div>{option.dish}</div>
              <div>{option.description}</div>
              <div>{option.recipe}</div>
            </div>
          ))}
        </div>
      )}
      <div>Lunch</div>
      {lunch && (
        <div>
          {lunch.options.map((option, index) => (
            <div key={index}>
              <div>{option.dish}</div>
              <div>{option.description}</div>
              <div>{option.recipe}</div>
            </div>
          ))}
        </div>
      )}
      {snacks && (
        <div>
          <div>Snacks</div>
          <div>
            {snacks.options.map((option, index) => (
              <div key={index}>
                <div>{option.dish}</div>
                <div>{option.description}</div>
                <div>{option.recipe}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>Dinner</div>
      {dinner && (
        <div>
          {dinner.options.map((option, index) => (
            <div key={index}>
              <div>{option.dish}</div>
              <div>{option.description}</div>
              <div>{option.recipe}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NutritionChart;
