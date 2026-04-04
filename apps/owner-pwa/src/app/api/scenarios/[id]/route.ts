import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET single scenario
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Nie zalogowano" }, { status: 401 });
  }
  if (session.role === "pending") {
    return NextResponse.json({ error: "Konto oczekuje na weryfikację" }, { status: 403 });
  }

  const { id } = await params;

  const scenario = await prisma.scenario.findUnique({ where: { id } });
  if (!scenario) {
    return NextResponse.json(
      { error: "Nie znaleziono scenariusza" },
      { status: 404 }
    );
  }

  return NextResponse.json(scenario);
}

// PUT — update scenario (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Nie zalogowano" }, { status: 401 });
  }
  if (session.role !== "admin" && session.role !== "editor") {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const { title, description } = await request.json();
    const scenario = await prisma.scenario.update({
      where: { id },
      data: {
        title,
        description,
        status: "PENDING",
        feedback: null
      },
    });
    return NextResponse.json(scenario);
  } catch {
    return NextResponse.json(
      { error: "Nie udało się zaktualizować scenariusza" },
      { status: 500 }
    );
  }
}

// DELETE scenario (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Nie zalogowano" }, { status: 401 });
  }
  if (session.role !== "admin" && session.role !== "editor") {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 403 });
  }

  const { id } = await params;

  try {
    await prisma.scenario.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Nie udało się usunąć scenariusza" },
      { status: 500 }
    );
  }
}
