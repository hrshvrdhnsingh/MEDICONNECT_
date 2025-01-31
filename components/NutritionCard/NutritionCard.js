import React from "react";
import styles from "./NutritionCard.module.css";
import { AOSInit } from "/aos.tsx";

const NutritionCard = ({ nutritionData }) => {
  console.log(nutritionData.options);
  return (
    <div className="flex overflow-hidden justify-center items-center w-[75vw] py-2 h-[46vh] gap-4" data-aos="fade-up" data-aos-easing="ease" data-aos-delay="100">
      <AOSInit />
      {nutritionData.options.map((option, index) => (
        <div className="hover:border-blue-500 hover:border-2 flex flex-column items-center w-[31%] h-full gap-2 bg-blue-300/20 backdrop-blur-md rounded-2xl p-3" key={index}>
          <div className="font-medium text-xl text-gray-400">{option.dish}</div>
          <div className="text-gray-300">
            <span>-</span>
            {option.description}
          </div>
          <div className="text-gray-300">
            <span>Recipe : </span> {option.recipe}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NutritionCard;
