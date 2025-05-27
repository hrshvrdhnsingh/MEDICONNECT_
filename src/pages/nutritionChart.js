import React, { useEffect, useState } from 'react';
import nutritionDetails from '../../data/nutritionDetails.json';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../styles/nutritionChart.module.css';
import { Input } from '@nextui-org/react';
import { Checkbox } from '@nextui-org/react';
import NutritionCard from '../../components/NutritionCard/NutritionCard';
import { adminAuth } from '../../lib/firebaseAdmin'; 

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    await adminAuth.verifyIdToken(token);
    return { props: {} }; // or additional props if needed
  } catch (error) {
    console.error('Token verification failed:', error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

const NutritionChart = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
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

  // Replace both handlers with a single function
  const handleDietTypeChange = (type) => {
    if (type === 'veg') {
      setIsVegetarian(true);
      setIsNonVegetarian(false);
    } else if (type === 'non-veg') {
      setIsVegetarian(false);
      setIsNonVegetarian(true);
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
          nutritionDetails.diet_plan.Weight_Gain['non-veg'].breakfast
        );
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
        setBreakfast(
          nutritionDetails.diet_plan.Maintenance['non-veg'].breakfast
        );
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
        setBreakfast(
          nutritionDetails.diet_plan.Weight_Loss['non-veg'].breakfast
        );
        setLunch(nutritionDetails.diet_plan.Weight_Loss['non-veg'].lunch);
        setSnacks(nutritionDetails.diet_plan.Weight_Loss['non-veg'].snacks);
        setDinner(nutritionDetails.diet_plan.Weight_Loss['non-veg'].dinner);
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
          nutritionDetails.diet_plan.Losing_Excessive_Weight['non-veg']
            .breakfast
        );
        setLunch(
          nutritionDetails.diet_plan.Losing_Excessive_Weight['non-veg'].lunch
        );
        setSnacks(
          nutritionDetails.diet_plan.Losing_Excessive_Weight['non-veg'].snacks
        );
        setDinner(
          nutritionDetails.diet_plan.Losing_Excessive_Weight['non-veg'].dinner
        );
      }
    }
  };

  return (
    <div className={styles.nutrition_bg}>
      <Navbar />
      <form
        className='flex flex-col gap-2'
        onSubmit={(e) => {
          e.preventDefault();
          prepareDietChart();
        }}
      >
        <div className='h-[10vh]'></div>
        <div className='flex justify-evenly lg:p-0 p-2 lg:gap-0 gap-2'>
          <div className='flex flex-wrap md:flex-nowrap w-3/12 gap-4 mt-12 text-blue-300 lg:text-xl text-lg font-medium'>
            <label className=' w-full'>
              Height (cm):
              <Input
                type='number'
                value={height}
                label='Enter your height'
                className='w-full'
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
          </div>
          <div className='flex flex-wrap md:flex-nowrap w-3/12 gap-4 mt-12 text-blue-300  lg:text-xl text-lg font-medium'>
            <label className='w-full'>
              Weight (kg):
              <Input
                type='number'
                value={weight}
                label='Enter your weight'
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className='flex justify-evenly mt-4 text-blue-300'>
          <Checkbox
            radius='md'
            isSelected={isVegetarian}
            onChange={() => handleDietTypeChange('veg')}
            className='flex justify-center items-center'
          >
            <p className='text-blue-400 lg:text-xl text-lg flex justify-center items-center'>Vegetarian</p>
          </Checkbox>
          <Checkbox
            radius='md'
            isSelected={isNonVegetarian}
            onChange={() => handleDietTypeChange('non-veg')}
            className='flex justify-center items-center'
          >
            <p className='text-blue-400 lg:text-xl text-lg flex justify-center items-center'>Non-Vegetarian</p>
          </Checkbox>
        </div>
        <div className={styles.btn}>
          <button
            type='submit'
            onClick={prepareDietChart}
            color='primary'
            className='flex justify-center text-xl px-3 py-2 ease-in-out duration-200 text-white bg-gradient-to-r from-blue-400 to-blue-700 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg'
          >
            Prepare Diet Chart
          </button>
        </div>

        <div className={styles.nutrition_container}>
          {breakfast && (
            <>
              <h3
                className='mt-4 text-2xl font-medium text-gray-300'
                data-aos='fade-up'
                data-aos-easing='ease'
                data-aos-delay='150'
              >
                Breakfast
              </h3>
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
              <h3
                className='mt-4 text-2xl font-medium text-gray-300'
                data-aos='fade-up'
                data-aos-easing='ease'
                data-aos-delay='150'
              >
                Lunch
              </h3>
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
              <h3
                className='mt-4 text-2xl font-medium text-gray-300'
                data-aos='fade-up'
                data-aos-easing='ease'
                data-aos-delay='150'
              >
                Snacks
              </h3>
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
              <h3
                className='mt-4 text-2xl font-medium text-gray-300'
                data-aos='fade-up'
                data-aos-easing='ease'
                data-aos-delay='150'
              >
                Dinner
              </h3>
              <NutritionCard nutritionData={dinner} />
            </>
          )}
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default NutritionChart;
