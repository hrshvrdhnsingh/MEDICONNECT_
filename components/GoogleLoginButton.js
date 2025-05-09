// components/GoogleLoginButton.js
import { auth, provider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      Cookies.set('token', token);

      // Check in your own DB if this uid exists
      const res = await fetch(`/api/check-user-or-doctor?uid=${user.uid}`);
      const { exists, type } = await res.json();

      Cookies.set('userType', type); // Set user type in cookies

      // redirect:
      router.push(exists ? '/' : '/user-details');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return <button onClick={handleLogin} className='bg-gray-300 rounded-lg px-3 py-2  text-2xl font-medium hover:scale-95 transition-all duration-400'>Sign in with Google</button>;
}
