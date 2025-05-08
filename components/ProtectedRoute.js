// components/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import { app } from '../lib/firebase'; // adjust path if needed

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      // check if user exists in your MongoDB
      const res = await fetch(`/api/check-user?uid=${user.uid}`);
      const data = await res.json();

      if (!data.exists) {
        router.push('/form');
        return;
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default ProtectedRoute;
