import { NextRequest, NextResponse } from "next/server";
import { hasPermission, type Permission } from "@/domain/permissions";
import { getSession, type SessionPayload } from "@/lib/auth";

type GuardResult =
  | { ok: true; session: SessionPayload }
  | { ok: false; response: NextResponse };

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const requestHost = request.headers.get("host");
    return new URL(origin).host === requestHost;
  } catch {
    return false;
  }
}

export async function requirePermission(
  permission: Permission,
  request?: NextRequest
): Promise<GuardResult> {
  const activeSession = await requireActiveSession(request);
  if (!activeSession.ok) return activeSession;

  if (!hasPermission(activeSession.session, permission)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Brak uprawnien" }, { status: 403 }),
    };
  }

  return activeSession;
}

export async function requireActiveSession(request?: NextRequest): Promise<GuardResult> {
  const session = await getSession();

  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Nie zalogowano" }, { status: 401 }),
    };
  }

  if (request && !sameOrigin(request)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Odrzucono akcje spoza tej aplikacji." },
        { status: 403 }
      ),
    };
  }

  if (session.accountStatus !== "active") {
    return {
      ok: false,
      response: NextResponse.json({ error: "Konto nie jest aktywne" }, { status: 403 }),
    };
  }

  return { ok: true, session };
}
