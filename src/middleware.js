import { NextResponse } from 'next/server';
import { adminAuth } from '../lib/firebaseAdmin';

export async function middleware(req) {
  const allowedRoutes = [
    '/',
    '/diseasePrediction',
    '/nearestPharmacies',
    '/chat',
    '/nearestHospitals',
    '/medicineDetails',
    '/nutritionChart',
    '/login',
    '/user-details',
    '/dashboard',
  ];

  const { pathname } = req.nextUrl;
  // Get the token value safely for all Next.js versions
  const token = req.cookies.get('token');
  const tokenValue = token?.value || token;

  console.log('The token is:', token);
  console.log('The token value is:', tokenValue);

  // Allow static files and API routes to bypass middleware
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }

  // Do not protect the root path
  if (pathname === '/') {
    return NextResponse.next();
  }

  // If route is protected and no token, redirect to login
  if (
    allowedRoutes.includes(pathname) &&
    pathname !== '/login' &&
    !tokenValue
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If token exists, verify it using adminAuth
  if (allowedRoutes.includes(pathname) && pathname !== '/login' && tokenValue) {
    try {
      await adminAuth.verifyIdToken(tokenValue);
    } catch (err) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (!allowedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
