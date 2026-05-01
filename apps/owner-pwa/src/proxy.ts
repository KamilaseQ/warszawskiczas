import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/api/auth/login", "/register", "/api/auth/register", "/offline"];

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".webmanifest") ||
    pathname.endsWith(".js") ||
    pathname === "/manifest.json" ||
    pathname === "/robots.txt" ||
    pathname === "/sw.js"
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path)) || isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    console.error("AUTH_SECRET is not set.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    const role = String(payload.role || "");
    const accountStatus = String(payload.accountStatus || "active");
    const isOwner = role === "owner" || role === "admin";
    const isEditor = role === "editor";

    if (accountStatus !== "active") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/admin/users") && !isOwner) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/admin") && !isOwner && !isEditor) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
