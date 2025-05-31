// components/ProtectedRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get('token');
      if (!token) {console.log("token not found in protected"); return router.push('/login');}
      try {
        const res = await fetch('/api/verify-token', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!data.valid) {
          console.log("token invalid")
          Cookies.remove('token');
          router.push('/login');
        }
      } catch {
        Cookies.remove('token');
        router.push('/login');
      }
    };
    verifyToken();
  }, [router]);

  return children;
}
