import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password || username.length < 3 || password.length < 5) {
      return NextResponse.json(
        { error: "Podaj prawidłową nazwę (min. 3 znaki) i hasło (min. 5 znaków)." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Użytkownik o takiej nazwie już istnieje." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "pending", 
      },
    });

    return NextResponse.json({ success: true, username: user.username });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Błąd podczas rejestracji." },
      { status: 500 }
    );
  }
}
