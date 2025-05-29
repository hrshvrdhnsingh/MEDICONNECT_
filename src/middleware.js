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

  console.log("Middleware is running...");

  const { pathname } = req.nextUrl;
  // Get the token value safely for all Next.js versions
  // const token = req.cookies.get('token');
  // const tokenValue = token?.value || token;

  // Allow static files and API routes to bypass middleware
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }

  // Do not protect the root path
  // if (pathname === '/') {
  //   return NextResponse.next();
  // }


  // // If route is protected and no token, redirect to login
  // if (
  //   allowedRoutes.includes(pathname) &&
  //   pathname !== '/login' &&
  //   !tokenValue
  // ) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // console.log("The pathname is allowed:", pathname, allowedRoutes.includes(pathname));

  if (!allowedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
