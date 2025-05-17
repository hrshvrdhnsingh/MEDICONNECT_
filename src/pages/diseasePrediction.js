import React, { useState, useEffect } from 'react';
import symptomsData from '../../data/SymptomsJSON.json';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../styles/diseasePrediction.module.css';
import { Button } from '@nextui-org/react';
import { Checkbox } from '@nextui-org/react';
import StartupLoader from '../../components/StartupLoader/StartupLoader';

export default function SymptomCheckbox() {
  const [checkedSymptoms, setCheckedSymptoms] = useState({});
  const [predictedDisease, setPredictedDisease] = useState(null);
  const [startupLoading, setStartupLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    setStartupLoading(true);
    fetch('https://diseasepredictionapi.onrender.com')
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
      console.log(selectedSymptomsArray);

      const symptomsArray = {
        list: selectedSymptomsArray,
      };

      const response = await axios.post(
        'https://diseasepredictionapi.onrender.com/Bs',
        symptomsArray
      );
      // console.log({ response });

      setPredictedDisease(response.data.Disease);
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
        <div className='fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-blue-800 bg-opacity-30 z-[120]'>
          <div className={styles.loader}></div>
        </div>
      )}
      <Navbar />
      <div className='flex justify-center items-center lg:mt-16 mt-12 flex-col'>
        {predictedDisease && (
          <div className='flex justify-center mt-4'>
            <div className='flex justify-center items-center gap-4'>
              {predictedDisease && (
                <div className='text-xl text-blue-300 font-medium'>
                  You may have :{' '}
                </div>
              )}
              <div className='text-4xl text-gray-300'>{predictedDisease}</div>
            </div>
          </div>
        )}
        {Object.entries(symptomsData).map(([category, data]) => (
          <div className='lg:w-[80vw] w-[90vw] hover:border-blue-500 hover:border-2 mt-8 px-4 py-3 bg-blue-300/20 backdrop-blur-xl rounded-2xl'>
            <div key={category}>
              <div className='flex justify-center'>
                <div className='flex justify-center text-xl bg-blue-300 px-3 py-2 rounded-xl text-gray-200'>
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
          <Button
            onClick={handlePredict}
            color='primary'
            className='text-2xl p-4 hover:scale-95'
          >
            Predict disease
          </Button>
          <Button
            onClick={handleReset}
            color='primary'
            className='text-2xl p-4 hover:scale-95'
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
