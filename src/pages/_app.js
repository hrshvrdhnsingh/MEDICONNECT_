import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageLoader from '../../components/PageLoader/PageLoader';
import GPTButton from '@/components/ChatWidget/GPTButton';
import ChatModal from '@/components/ChatWidget/ChatWidget';

let apisFetched = false;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!apisFetched) {
      fetch(process.env.NEXT_PUBLIC_DISEASE_PREDICTION_API_URL);
      fetch(process.env.NEXT_PUBLIC_CHAT_SERVER_URL);
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

  const isChatPage = router.pathname === '/chat' || router.pathname === '/login' || router.pathname == '/user-details';
  
  return (
    <NextUIProvider>
      <div
        style={{
          backgroundColor: '#182f5d',
          minHeight: '100vh',
          width: '100vw',
          position: 'relative'
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
        {!isChatPage && (
          <>
            <GPTButton onClick={() => setIsChatOpen(true)} />
            <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          </>
        )}
      </div>
    </NextUIProvider>
  );
}

export default MyApp;
