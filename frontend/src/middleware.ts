import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "../auth.config";
export const { auth: AuthMiddleware } = NextAuth(authConfig);

const protectedRoutes = [ "/projects", "/users" ];
const unprotectedRoutes = ["/"];

export default async function middleware(request: NextRequest) {
  const session = await AuthMiddleware();

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix),
  );

  if (!session && isProtectedRoute) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
