import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    fetch('https://diseasepredictionapi.onrender.com')
      .then(() => console.log('ping successful'))
      .catch(() => console.log('ping error'));
  }, []);

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
