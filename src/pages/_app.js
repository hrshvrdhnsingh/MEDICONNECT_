import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageLoader from '../../components/PageLoader/PageLoader';

let apisFetched = false;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!apisFetched) {
      fetch('https://diseasepredictionapi.onrender.com');
      fetch('https://mediconnectfork-3.onrender.com');
      apisFetched = true;
    }
  }, []);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <NextUIProvider>
      <div
        style={{
          backgroundColor: '#182f5d',
          minHeight: '100vh',
          width: '100vw',
        }}
      >
        {loading && (
          <div
            style={{
              backgroundColor: '#0116726b',
              minHeight: '100vh',
              width: '100vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 9999,
            }}
          >
            <PageLoader />
          </div>
        )}
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  );
}

export default MyApp;
