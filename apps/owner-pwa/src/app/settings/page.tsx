"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    setMounted(true);
    // Fetch current user info
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUsername(data.user.username);
      });
  }, []);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: password || undefined }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Wystąpił błąd" });
      } else {
        setMessage({ type: "success", text: "Zaktualizowano pomyślnie" });
        setPassword("");
      }
    } catch {
      setMessage({ type: "error", text: "Błąd połączenia z serwerem" });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

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
        <div className="flex items-center gap-3 px-5 py-4">
          <button onClick={() => router.push("/")} className="btn btn-ghost p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            <span className="text-gold-gradient">Ustawienia</span>
          </h1>
        </div>
      </header>

      <main className="flex-1 px-5 py-6">
        {/* Motyw */}
        <section className="mb-10 animate-fade-in-up stagger-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
            Wygląd aplikacji
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme("dark")}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border ${theme === "dark" ? "border-green-500 shadow-md" : "border-transparent"}`}
              style={{
                background: "var(--bg-card)",
                borderColor: theme === "dark" ? "var(--accent-500)" : "var(--border-subtle)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Ciemny</span>
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border ${theme === "light" ? "border-green-500 shadow-md" : "border-transparent"}`}
              style={{
                background: "var(--bg-card)",
                borderColor: theme === "light" ? "var(--accent-500)" : "var(--border-subtle)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Jasny</span>
            </button>
          </div>
        </section>

        {/* Konto */}
        <section className="animate-fade-in-up stagger-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
            Zarządzanie kontem
          </h2>
          <form onSubmit={handleUpdateCredentials} className="card p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                Nazwa użytkownika
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                Nowe hasło (opcjonalnie)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Pozostaw puste, by nie zmieniać"
              />
            </div>

            {message.text && (
              <div 
                className={`text-sm p-3 rounded-lg flex items-center gap-2`}
                style={{
                  background: message.type === "error" ? "var(--status-rejected-bg)" : "var(--status-accepted-bg)",
                  color: message.type === "error" ? "var(--status-rejected)" : "var(--status-accepted)",
                  border: `1px solid ${message.type === "error" ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"}`
                }}
              >
                {message.text}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary w-full h-12 mt-2">
              {loading ? <span className="spinner" /> : "Zapisz zmiany"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
