import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { username, password } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Since we're using session username to identify the user
    const user = await prisma.user.findUnique({
      where: { username: session.username as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const dataToUpdate: { username: string; password?: string } = { username };

    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    // Check if new username is taken by someone else
    if (username !== user.username) {
      const existing = await prisma.user.findUnique({ where: { username } });
      if (existing) {
        return NextResponse.json({ error: "Nazwa użytkownika jest już zajęta" }, { status: 400 });
      }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: dataToUpdate,
    });

    if (username !== user.username) {
      // Re-issue session with new username so they stay logged in
      await createSession(username, session.role);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ error: "Wystąpił błąd podczas zapisywania" }, { status: 500 });
  }
}
