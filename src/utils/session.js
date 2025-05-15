// utils/session.js
import Cookies from 'js-cookie';
import { auth } from '../../lib/firebase';

export async function checkAndSetUserSession() {
  const token = Cookies.get('token');
  const user_uid = Cookies.get('user_uid');
  const userType = Cookies.get('userType');

  // If all cookies exist, assume session is already set
  if (token && user_uid && userType) {
    return { token, user_uid, userType };
  }

  try {
    // Attempt to get current user from Firebase Auth
    const user = auth.currentUser;

    if (!user) throw new Error('User not authenticated via Firebase');

    const token = await user.getIdToken();
    Cookies.set('token', token);

    const res = await fetch(`/api/check-user-or-doctor?uid=${user.uid}`);
    const { exists, type } = await res.json();

    if (!exists) {
      throw new Error('User not found in database');
    }

    Cookies.set('user_uid', user.uid);
    Cookies.set('userType', type);

    return {
      token,
      user_uid: user.uid,
      userType: type,
    };
  } catch (err) {
    console.error('Session setup failed:', err.message);
    return null;
  }
}
