import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
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

    await createSession(username, role);

    return NextResponse.json({ success: true, role });
  } catch {
    return NextResponse.json(
      { error: "Błąd serwera" },
      { status: 500 }
    );
  }
}
