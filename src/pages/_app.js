import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageLoader from '../../components/PageLoader/PageLoader';
import GPTButton from '@/components/ChatWidget/GPTButton';
import ChatModal from '@/components/ChatWidget/ChatWidget';
import Cookies from 'js-cookie';

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

  useEffect(() => {
    // Exclude '/' and '/login' from token verification
    if (router.pathname === '/' || router.pathname === '/login') return;
    const verifyToken = async () => {
      const token = Cookies.get('token');
      if (!token) return;
      try {
        const res = await fetch('/api/verify-token', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // console.log('Token verification response:', data);
        if (!data.valid) {
          Cookies.remove('token');
          router.push('/login');
        }
      } catch {
        Cookies.remove('token');
        router.push('/login');
      }
    };
    verifyToken();
  }, [router.pathname]);

  const isChatPage =
    router.pathname === '/chat' ||
    router.pathname === '/login' ||
    router.pathname == '/user-details';

  return (
    <NextUIProvider>
      <div
        style={{
          backgroundColor: '#182f5d',
          minHeight: '100vh',
          width: '100vw',
          position: 'relative',
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
            <ChatModal
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
            />
          </>
        )}
      </div>
    </NextUIProvider>
  );
}

export default MyApp;
