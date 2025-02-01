import React, { useEffect, useState } from "react";
import nutritionDetails from "../../data/nutritionDetails.json";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../styles/nutritionChart.module.css";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import NutritionCard from "../../components/NutritionCard/NutritionCard";
import { Footer } from "../../components/Footer/Footer";
import { AOSInit } from "/aos.tsx";

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
        setBreakfast(
          nutritionDetails.diet_plan.Weight_Gain["non-veg"].breakfast
        );
        setLunch(nutritionDetails.diet_plan.Weight_Gain["non-veg"].lunch);
        setSnacks(nutritionDetails.diet_plan.Weight_Gain["non-veg"].snacks);
        setDinner(nutritionDetails.diet_plan.Weight_Gain["non-veg"].dinner);
      }
    } else if (bmi >= 18.5 && bmi < 25) {
      if (isVegetarian) {
        setBreakfast(nutritionDetails.diet_plan.Maintenance.veg.breakfast);
        setLunch(nutritionDetails.diet_plan.Maintenance.veg.lunch);
        setSnacks(nutritionDetails.diet_plan.Maintenance.veg.snacks);
        setDinner(nutritionDetails.diet_plan.Maintenance.veg.dinner);
      } else if (isNonVegetarian) {
        setBreakfast(
          nutritionDetails.diet_plan.Maintenance["non-veg"].breakfast
        );
        setLunch(nutritionDetails.diet_plan.Maintenance["non-veg"].lunch);
        setSnacks(nutritionDetails.diet_plan.Maintenance["non-veg"].snacks);
        setDinner(nutritionDetails.diet_plan.Maintenance["non-veg"].dinner);
      }
    } else if (bmi >= 25 && bmi <= 30) {
      if (isVegetarian) {
        setBreakfast(nutritionDetails.diet_plan.Weight_Loss.veg.breakfast);
        setLunch(nutritionDetails.diet_plan.Weight_Loss.veg.lunch);
        setSnacks(nutritionDetails.diet_plan.Weight_Loss.veg.snacks);
        setDinner(nutritionDetails.diet_plan.Weight_Loss.veg.dinner);
      } else if (isNonVegetarian) {
        setBreakfast(
          nutritionDetails.diet_plan.Weight_Loss["non-veg"].breakfast
        );
        setLunch(nutritionDetails.diet_plan.Weight_Loss["non-veg"].lunch);
        setSnacks(nutritionDetails.diet_plan.Weight_Loss["non-veg"].snacks);
        setDinner(nutritionDetails.diet_plan.Weight_Loss["non-veg"].dinner);
      }
    } else if (bmi > 30) {
      if (isVegetarian) {
        setBreakfast(
          nutritionDetails.diet_plan.Losing_Excessive_Weight.veg.breakfast
        );
        setLunch(nutritionDetails.diet_plan.Losing_Excessive_Weight.veg.lunch);
        setSnacks(
          nutritionDetails.diet_plan.Losing_Excessive_Weight.veg.snacks
        );
        setDinner(
          nutritionDetails.diet_plan.Losing_Excessive_Weight.veg.dinner
        );
      } else if (isNonVegetarian) {
        setBreakfast(
          nutritionDetails.diet_plan.Losing_Excessive_Weight["non-veg"]
            .breakfast
        );
        setLunch(
          nutritionDetails.diet_plan.Losing_Excessive_Weight["non-veg"].lunch
        );
        setSnacks(
          nutritionDetails.diet_plan.Losing_Excessive_Weight["non-veg"].snacks
        );
        setDinner(
          nutritionDetails.diet_plan.Losing_Excessive_Weight["non-veg"].dinner
        );
      }
    }
  };

  return (
    <div className={styles.nutrition_bg}>
      <Navbar />
      <div>
        <div className="h-[10vh]"></div>
        <div className="flex justify-evenly lg:p-0 p-2 lg:gap-0 gap-4">
          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-12 text-blue-300 lg:text-xl text-lg font-medium">
            <label>
              Height (cm):
              <Input
                type="number"
                value={height}
                label="Enter your height"
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-12 text-blue-300  lg:text-xl text-lg font-medium">
            <label>
              Weight (kg):
              <Input
                type="number"
                value={weight}
                label="Enter your weight"
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-evenly mt-4 text-blue-300">
          <Checkbox                 
            radius="md"
            checked={isVegetarian}
            onChange={handleVegetarianChange}
          ><p className="text-blue-400 lg:text-xl text-lg">Vegetarian</p></Checkbox>
          <Checkbox                     
            radius="md"
            checked={isNonVegetarian}
            onChange={handleNonVegetarianChange}
          ><p className="text-blue-400 lg:text-xl text-lg">Non-Vegetarian</p></Checkbox>
        </div>
        <div className={styles.btn}>
          <Button
            onClick={prepareDietChart}
            color="primary"
            className="flex justify-center text-xl px-3 py-2"
          >
            Prepare Diet Chart
          </Button>
        </div>
        {console.log({ breakfast })}

        <div className={styles.nutrition_container}>
          {breakfast && (
            <>
              <h3 className="mt-4 text-2xl font-medium text-gray-300"  data-aos="fade-up" data-aos-easing="ease" data-aos-delay="150">Breakfast</h3>
              <NutritionCard nutritionData={breakfast} />
              {/* <div>
              {breakfast.options.map((option, index) => (
                <div key={index}>
                  <div>{option.dish}</div>
                  <div>{option.description}</div>
                  <div>{option.recipe}</div>
                </div>
              ))}
            </div> */}
            </>
          )}
          {lunch && (
            <>
              <h3 className="mt-4 text-2xl font-medium text-gray-300"  data-aos="fade-up" data-aos-easing="ease" data-aos-delay="150">Lunch</h3>
              <NutritionCard nutritionData={lunch} />
              {/* <div>
              {lunch.options.map((option, index) => (
                <div key={index}>
                  <div>{option.dish}</div>
                  <div>{option.description}</div>
                  <div>{option.recipe}</div>
                </div>
              ))}
            </div> */}
            </>
          )}
          {snacks && (
            <>
              <h3 className="mt-4 text-2xl font-medium text-gray-300"  data-aos="fade-up" data-aos-easing="ease" data-aos-delay="150">Snacks</h3>
              <NutritionCard nutritionData={snacks} />
              {/* <div>
                {snacks.options.map((option, index) => (
                  <div key={index}>
                    <div>{option.dish}</div>
                    <div>{option.description}</div>
                    <div>{option.recipe}</div>
                  </div>
                ))}
              </div> */}
            </>
          )}
          {dinner && (
            <>
              <h3 className="mt-4 text-2xl font-medium text-gray-300" data-aos="fade-up" data-aos-easing="ease" data-aos-delay="150">Dinner</h3>
              <NutritionCard nutritionData={dinner} />
              {/* <div>
              {dinner.options.map((option, index) => (
                <div key={index}>
                  <div>{option.dish}</div>
                  <div>{option.description}</div>
                  <div>{option.recipe}</div>
                </div>
              ))}
            </div> */}
            </>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default NutritionChart;
