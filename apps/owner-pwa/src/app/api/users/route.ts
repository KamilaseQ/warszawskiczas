import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-guard";

export async function GET() {
  try {
    const guard = await requirePermission("users:manage");
    if (!guard.ok) return guard.response;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        accountStatus: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("List users error:", error);
    return NextResponse.json({ error: "Wystapil blad podczas pobierania uzytkownikow." }, { status: 500 });
  }
}
