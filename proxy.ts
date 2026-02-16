import { NextRequest, NextResponse } from "next/server";

const PUBLIC_MANAGE_PATHS = ["/manage/login", "/manage/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /manage/* routes
  if (!pathname.startsWith("/manage")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("colossem_token")?.value;

  // If user has a token and is visiting login/register, redirect to /manage
  if (token && PUBLIC_MANAGE_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/manage", request.url));
  }

  // If user has no token and is visiting a protected page, redirect to login
  if (!token && !PUBLIC_MANAGE_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/manage/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};
