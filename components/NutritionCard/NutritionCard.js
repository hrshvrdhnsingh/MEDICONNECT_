import React from "react";
import styles from "./NutritionCard.module.css";

const NutritionCard = ({ nutritionData }) => {
  console.log(nutritionData.options);
  return (
    <div className={styles.nutrition_card}>
      {nutritionData.options.map((option, index) => (
        <div className={styles.nutrition_option} key={index}>
          <div className={styles.option_dish}>{option.dish}</div>
          <div className={styles.option_description}>
            <span>-</span>
            {option.description}
          </div>
          <div className={styles.option_recipe}>
            <span>Recipe : </span> {option.recipe}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NutritionCard;
