import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all scenarios
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Nie zalogowano" }, { status: 401 });
  }
  if (session.role === "pending") {
    return NextResponse.json({ error: "Konto oczekuje na weryfikację" }, { status: 403 });
  }

  const scenarios = await prisma.scenario.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(scenarios);
}

// POST — create new scenario (admin only)
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Nie zalogowano" }, { status: 401 });
  }
  if (session.role !== "admin" && session.role !== "editor") {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 403 });
  }

  try {
    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Tytuł i opis są wymagane" },
        { status: 400 }
      );
    }

    const scenario = await prisma.scenario.create({
      data: { title, description },
    });

    return NextResponse.json(scenario, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Nie udało się utworzyć scenariusza" },
      { status: 500 }
    );
  }
}
