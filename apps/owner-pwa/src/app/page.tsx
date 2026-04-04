"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserInfo {
  username: string;
  role: "admin" | "owner" | "editor" | "viewer" | "pending";
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setUser({ username: data.username, role: data.role });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="spinner" style={{ width: 32, height: 32 }} />
      </div>
    );
  }

  const isAdmin = user?.role === "admin";
  const isEditor = user?.role === "editor";
  const isOwner = user?.role === "owner";
  const isViewer = user?.role === "viewer";
  const isPending = user?.role === "pending" || !user?.role;

  const roleLabels: Record<string, string> = {
    admin: "Panel Administratora",
    owner: "Panel Właściciela",
    editor: "Panel Edytora",
    viewer: "Panel Obserwatora",
    pending: "Oczekiwanie na weryfikację"
  };

  const getTiles = () => {
    let t = [];
    if (isAdmin || isEditor) {
      t.push({
        id: "manage-scenarios",
        title: "Zarządzanie projektami",
        desc: "Twórz i zarządzaj bazą scenariuszy wideo",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        ),
        href: "/admin/scenarios",
        accent: "var(--accent-500)",
        count: null as number | null,
      });
    }

    if (isOwner || isViewer) {
      t.push({
        id: "view-scenarios",
        title: "Baza Scenariuszy",
        desc: isViewer ? "Przeglądaj zatwierdzone materiały i statusy prac" : "Przeglądaj i zatwierdzaj scenariusze",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
          </svg>
        ),
        href: "/scenarios",
        accent: "var(--accent-500)",
        count: null as number | null,
      });
    }

    if (isAdmin) {
      t.push({
        id: "manage-users",
        title: "Użytkownicy",
        desc: "Zarządzaj kontami, przypisuj role",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        ),
        href: "/admin/users",
        accent: "var(--gold-500)",
        count: null as number | null,
      });
    }
    return t;
  };
  
  const tiles = getTiles();

  return (
    <div className="flex flex-col flex-1" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: "var(--bg-header)",
          backdropFilter: "blur(16px) saturate(180%)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Image src="/icon_logo.png" alt="Logo Warszawski Czas" width={32} height={32} priority className="h-8 w-auto rounded-sm" />
            <div>
              <h1 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                <span className="text-gold-gradient">Warszawski Czas</span>
              </h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {roleLabels[user?.role || "pending"]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/settings")} className="btn btn-ghost p-2" title="Ustawienia">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            <button onClick={handleLogout} className="btn btn-ghost text-xs p-2" title="Wyloguj">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6">
        {/* Greeting */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Cześć, {user?.username} 👋
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Co chcesz dziś zrobić?
          </p>
        </div>

        {isPending ? (
          <div className="text-center py-20 animate-fade-in">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: "var(--status-pending-bg)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--status-pending)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--status-pending)" }}>
              Konto oczekuje na autoryzację
            </p>
            <p className="text-xs max-w-xs mx-auto" style={{ color: "var(--text-muted)" }}>
              Porozmawiaj z administratorem, aby otrzymać odpowiednie uprawnienia dostępu do aplikacji.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tiles.map((tile, i) => (
              <button
                key={tile.id}
                onClick={() => router.push(tile.href)}
                className={`card card-accent text-left p-5 w-full animate-fade-in-up stagger-${i + 1}`}
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${tile.accent}20, ${tile.accent}08)`,
                      color: tile.accent,
                      border: `1px solid ${tile.accent}25`,
                    }}
                  >
                    {tile.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                        {tile.title}
                      </h3>
                      {tile.count !== null && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: `${tile.accent}15`,
                            color: tile.accent,
                          }}
                        >
                          {tile.count}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                      {tile.desc}
                    </p>
                  </div>
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ color: "var(--text-muted)", marginTop: 2 }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {!isPending && <DashboardStats isAdmin={isAdmin} isEditor={isEditor} />}
      </main>
    </div>
  );
}

function DashboardStats({ isAdmin, isEditor }: { isAdmin: boolean; isEditor: boolean }) {
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, rejected: 0, recorded: 0 });

  useEffect(() => {
    fetch("/api/scenarios")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStats({
            total: data.length,
            pending: data.filter((s: { status: string }) => s.status === "PENDING").length,
            accepted: data.filter((s: { status: string }) => s.status === "ACCEPTED").length,
            rejected: data.filter((s: { status: string }) => s.status === "REJECTED").length,
            recorded: data.filter((s: { status: string }) => s.status === "RECORDED").length,
          });
        }
      });
  }, []);

  const items = [
    { filter: "ALL", label: "Wszystkie", value: stats.total, color: "var(--text-secondary)" },
    { filter: "PENDING", label: "Oczekujące", value: stats.pending, color: "var(--status-pending)" },
    { filter: "ACCEPTED", label: "Zaakceptowane", value: stats.accepted, color: "var(--status-accepted)" },
    { filter: "RECORDED", label: "Nagrane", value: stats.recorded, color: "var(--status-recorded)" },
  ];

  return (
    <div className="mt-8 animate-fade-in-up stagger-3">
      <h3 className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
        Statystyki scenariuszy
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push((isAdmin || isEditor) ? `/admin/scenarios?filter=${item.filter}` : `/scenarios?filter=${item.filter}`)}
            className="card p-4 text-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <p className="text-2xl font-bold" style={{ color: item.color }}>
              {item.value}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {item.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
