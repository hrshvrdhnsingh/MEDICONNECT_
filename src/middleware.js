import { NextResponse } from "next/server";

export function middleware(req) {
    const allowedRoutes = [
        "/", "/diseasePrediction", "/nearestPharmacies", "/chat", "/nearestHospitals",
        "/medicineDetails", "/nutritionChart", "/login", "/user-details", "/dashboard",
    ]; // These are the allowed routes for the app, the private route functionality has been done on client-side.

    const { pathname } = req.nextUrl;

    // Allow static files, favicon, and API routes to bypass middleware
    if (
        pathname.startsWith("/_next") || pathname.startsWith("/api") ||
        pathname.startsWith("/static") || pathname === "/favicon.ico") {
        return NextResponse.next();
    }

    // If the route is not allowed, then send the user back to the landing page
    if (!allowedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
