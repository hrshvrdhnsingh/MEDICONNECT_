import React, { useState, useEffect } from 'react';
import symptomsData from '../../data/SymptomsJSON.json';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../styles/diseasePrediction.module.css';
import { Button } from '@nextui-org/react';
import { Checkbox } from '@nextui-org/react';
import StartupLoader from '../../components/StartupLoader/StartupLoader';
import Footer from '@/components/Footer/Footer';
import PageLoader from '@/components/PageLoader/PageLoader';

export default function SymptomCheckbox() {
  const [checkedSymptoms, setCheckedSymptoms] = useState({});
  const [predictedDisease, setPredictedDisease] = useState(null);
  const [startupLoading, setStartupLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    setStartupLoading(true);
    fetch('https://disease-prediction-prob-api.onrender.com')
      .catch((err) => console.error('API warmup error:', err))
      .finally(() => setStartupLoading(false));
  }, []);

  useEffect(() => {
    if (!startupLoading) return;
    if (countdown === 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [startupLoading, countdown]);

  const handleCheckboxChange = (category, symptom, isChecked) => {
    setCheckedSymptoms((prevState) => ({
      ...prevState,
      [category]: {
        ...(prevState[category] || {}),
        [symptom]: isChecked,
      },
    }));
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const selectedSymptomsArray = [];
      for (const category in checkedSymptoms) {
        for (const symptom in checkedSymptoms[category]) {
          if (checkedSymptoms[category][symptom]) {
            selectedSymptomsArray.push(symptom);
          }
        }
      }
      // console.log(selectedSymptomsArray);

      const symptomsArray = {
        symptoms: selectedSymptomsArray,
      };

      const response = await axios.post(
        'https://disease-prediction-prob-api.onrender.com/predict',
        symptomsArray
      );
      // console.log({ response });

      // Handle new API response format: response.data['Top 3 Predictions']
      if (response.data && response.data['Top 3 Predictions']) {
        setPredictedDisease(response.data['Top 3 Predictions']);
      } else if (response.data && response.data.Disease) {
        setPredictedDisease([{ Disease: response.data.Disease }]);
      } else {
        setPredictedDisease(null);
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle the error here, such as displaying a message to the user
    }
    scrollToTop();
    setLoading(false);
  };

  const handleReset = () => {
    setCheckedSymptoms({});
  };

  return (
    <div className={styles.prediction_bg}>
      {startupLoading && (
        <div
          style={{
            backgroundColor: '#182f5d',
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 120,
            opacity: 0.98,
          }}
        >
          <StartupLoader countdown={countdown} />
        </div>
      )}
      {loading && !startupLoading && (
        <div className='fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-[#0116726b] z-[120]'>
          <PageLoader />
        </div>
      )}
      <Navbar />
      <div className='flex justify-center items-center lg:mt-16 mt-12 flex-col'>
        {predictedDisease && (
          <div className='flex justify-center mt-4'>
            <div className='flex flex-col items-center gap-2'>
              <div className='text-xl text-blue-300 font-medium'>
                Top 3 Predictions:
              </div>
              {predictedDisease.map((item, idx) => (
                <div
                  key={item.Disease + '-' + idx}
                  className='flex gap-4 items-center'
                >
                  <span className='text-2xl text-gray-300'>{item.Disease}</span>
                  {item.Probability !== undefined && (
                    <span className='text-lg text-blue-200'>
                      (Probability: {(item.Probability * 100).toFixed(2)}%)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {Object.entries(symptomsData).map(([category, data]) => (
          <div
            className='lg:w-[80vw] w-[90vw] hover:border-blue-500 hover:border-2 mt-8 px-4 py-3 bg-blue-300/20 backdrop-blur-xl rounded-2xl'
            key={category}
          >
            <div key={category}>
              <div className='flex justify-center'>
                <div className='flex justify-center text-xl bg-gradient-to-r from-blue-400 to-blue-600 px-3 py-2 rounded-xl text-gray-200'>
                  <h2>{category}</h2>
                </div>
              </div>
              <div className='flex justify-center mt-2'>
                <div className='flex flex-wrap justify-center w-full'>
                  {data.symptoms.map((symptom) => (
                    <div
                      key={Object.keys(symptom)[0]}
                      className='bg-gray-200 flex min-w-max lg:text-medium rounded-xl px-1 py-1 mx-1 my-1 lg:px-2 lg:py-1 lg:mx-2 lg:my-2 text-black'
                    >
                      <Checkbox
                        id={Object.values(symptom)[0]}
                        radius='md'
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
        <div className='flex justify-center m-8 gap-4'>
          <button
            onClick={handlePredict}
            color='primary'
            className='text-white bg-gradient-to-r from-blue-500 to-blue-800 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg ease-in-out duration-200 text-xl px-3 py-2.5 text-cente'
          >
            Predict disease
          </button>
          <button
            onClick={handleReset}
            color='primary'
            className='text-white text-xl bg-gradient-to-r from-blue-500 to-blue-800 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg ease-in-out duration-200 px-3 py-2.5 text-cente'
          >
            Reset
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
