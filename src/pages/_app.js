import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import StartupLoader from '../../components/StartupLoader/StartupLoader'; // Adjust path if needed

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    // Fetch both APIs simultaneously and wait for both to finish
    Promise.all([
      fetch('https://diseasepredictionapi.onrender.com'),
      fetch('https://mediconnectfork-3.onrender.com'),
    ])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) return;
    if (countdown === 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [loading, countdown]);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: '#182f5d',
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StartupLoader countdown={countdown} />
      </div>
    );
  }

  return (
    <NextUIProvider>
      <div
        style={{
          backgroundColor: '#182f5d',
          minHeight: '100vh',
          width: '100vw',
        }}
      >
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  );
}

export default MyApp;
