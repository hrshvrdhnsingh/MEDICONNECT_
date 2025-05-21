import { NextResponse } from 'next/server';

export function middleware(req) {
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
  const token = req.cookies.get('token');

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
  if (allowedRoutes.includes(pathname) && pathname !== '/login' && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (!allowedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
