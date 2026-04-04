import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export async function POST(request: NextRequest) {
  try {
    const { username, password, inviteCode } = await request.json();

    // Validate invite code
    const requiredCode = process.env.INVITE_CODE;
    if (!requiredCode) {
      return NextResponse.json(
        { error: "Rejestracja jest tymczasowo wyłączona." },
        { status: 403 }
      );
    }

    if (!inviteCode || inviteCode !== requiredCode) {
      return NextResponse.json(
        { error: "Nieprawidłowy kod zaproszenia." },
        { status: 403 }
      );
    }

    // Validate username
    if (!username || username.length < 3 || username.length > 30) {
      return NextResponse.json(
        { error: "Nazwa użytkownika musi mieć od 3 do 30 znaków." },
        { status: 400 }
      );
    }

    // Only allow alphanumeric + underscore
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json(
        { error: "Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenie." },
        { status: 400 }
      );
    }

    // Validate password strength
    if (!password || !PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        { error: "Hasło musi mieć min. 8 znaków, zawierać wielką literę i cyfrę." },
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

    const hashedPassword = await bcrypt.hash(password, 12);

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
