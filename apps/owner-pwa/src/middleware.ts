import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET environment variable is required");
}

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

const PUBLIC_PATHS = ["/login", "/api/auth/login", "/register", "/api/auth/register", "/api/auth/me/health"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow all static files including png and svg
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icons") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".svg") ||
    pathname === "/manifest.json" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);

    // Role-based route protection
    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
