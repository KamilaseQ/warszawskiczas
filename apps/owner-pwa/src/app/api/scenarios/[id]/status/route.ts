import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// PATCH — update scenario status (owner can accept/reject)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Nie zalogowano" }, { status: 401 });
  }

  if (session.role === "viewer" || session.role === "pending") {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const { status, feedback } = await request.json();

    if (!["ACCEPTED", "REJECTED", "PENDING", "RECORDED"].includes(status)) {
      return NextResponse.json(
        { error: "Nieprawidłowy status" },
        { status: 400 }
      );
    }

    const scenario = await prisma.scenario.update({
      where: { id },
      data: {
        status,
        feedback: status === "REJECTED" ? feedback || null : null,
      },
    });

    return NextResponse.json(scenario);
  } catch {
    return NextResponse.json(
      { error: "Nie udało się zmienić statusu" },
      { status: 500 }
    );
  }
}
