import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSession } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Zbyt wiele prób logowania. Spróbuj ponownie za ${Math.ceil(rateCheck.retryAfterSeconds / 60)} min.` },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.retryAfterSeconds) },
        }
      );
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Podaj login i hasło" },
        { status: 400 }
      );
    }

    const { valid, role } = await validateCredentials(username, password);

    if (!valid || !role) {
      return NextResponse.json(
        { error: "Nieprawidłowy login lub hasło" },
        { status: 401 }
      );
    }

    // Block pending users from logging in
    if (role === "pending") {
      return NextResponse.json(
        { error: "Twoje konto oczekuje na weryfikację przez administratora." },
        { status: 403 }
      );
    }

    await createSession(username, role);

    return NextResponse.json({ success: true, role });
  } catch {
    return NextResponse.json(
      { error: "Błąd serwera" },
      { status: 500 }
    );
  }
}
