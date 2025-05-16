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
    '/test'
  ];

  const { pathname } = req.nextUrl;

  // Allow static files and API routes to bypass middleware
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  if (!allowedRoutes.includes(pathname)) {
    // console.log('Redirecting to /'); // Log redirection
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
