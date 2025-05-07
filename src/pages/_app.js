import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect } from 'react';
import { io } from 'socket.io-client'; // Import socket.io-client

const socket = io('http://localhost:3001'); // Initialize socket connection

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    fetch('https://diseasepredictionapi.onrender.com');
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
