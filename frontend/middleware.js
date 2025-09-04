//Note: create a .env file in the root directory with JWT_SECRET variable
//JWT_SECRET=mysecretkey

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("Token:", token); // Debug

  const protectedRoutes = [
    "/ownerDashboard",
    "/principalDashboard",
    "/teacherDashboard",
    "/studentDashboard",
  ];

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const decoded = await verifyJWT(token);
    console.log("Decoded:", decoded); // Debug

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = decoded.role;

    // Role-based check
    if (req.nextUrl.pathname === "/ownerDashboard" && role !== "owner") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (req.nextUrl.pathname === "/principalDashboard" && role !== "principal") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (req.nextUrl.pathname === "/teacherDashboard" && role !== "teacher") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (req.nextUrl.pathname === "/studentDashboard" && role !== "student") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/ownerDashboard",
    "/principalDashboard",
    "/teacherDashboard",
    "/studentDashboard",
  ],
};
