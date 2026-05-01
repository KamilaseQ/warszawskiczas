"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Hasła nie są identyczne");
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      setError("Hasło musi mieć min. 8 znaków, wielką literę i cyfrę");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, inviteCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Błąd rejestracji");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("Błąd połączenia z serwerem");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="dark flex flex-col flex-1 items-center justify-center px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="w-full max-w-sm text-center animate-fade-in-up">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--status-accepted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Konto utworzone</h2>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Twoje konto oczekuje na weryfikację. Administrator musi nadać Ci uprawnienia zanim uzyskasz dostęp do panelu.
          </p>
          <Link href="/login" className="btn btn-secondary w-full h-12 flex justify-center items-center">
            Wróć do logowania
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dark flex flex-col flex-1 items-center justify-center px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(200,164,94,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-sm animate-fade-in-up" style={{ position: "relative", zIndex: 1 }}>
        <div className="text-center mb-10 relative">
          <div 
            className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[350px] h-[150px] pointer-events-none rounded-[100%]"
            style={{ background: "radial-gradient(ellipse at center, #000000 30%, transparent 75%)", filter: "blur(8px)", zIndex: -1 }}
          />
          <Image 
            key="register-logo"
            src="/logo.png" 
            alt="Logo Warszawski Czas" 
            width={300} 
            height={120} 
            priority
            className="h-[120px] w-[300px] object-contain mb-6 mx-auto animate-pulse-gold relative z-10" 
            style={{ mixBlendMode: "lighten" }}
          />
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Zarejestruj się
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Wymagany kod zaproszenia od administratora.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="inviteCode"
              className="block text-xs font-medium mb-2 uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Kod zaproszenia
            </label>
            <input
              id="inviteCode"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="input"
              placeholder="Wpisz kod zaproszenia"
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-xs font-medium mb-2 uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Login
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Wpisz login (min. 3 znaki)"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium mb-2 uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Hasło
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Min. 8 znaków, wielka litera, cyfra"
              autoComplete="new-password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium mb-2 uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Powtórz hasło
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              placeholder="Wpisz hasło ponownie"
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <div
              className="text-sm text-center py-3 rounded-lg animate-fade-in"
              style={{
                background: "var(--status-rejected-bg)",
                color: "var(--status-rejected)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full h-12 text-base font-semibold mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="spinner" style={{ borderTopColor: "#0a0a0a", borderColor: "rgba(0,0,0,0.2)" }} />
                Wysyłanie...
              </span>
            ) : (
              "Zarejestruj"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-8" style={{ color: "var(--text-muted)" }}>
          Posiadasz już zweryfikowane konto?{" "}
          <Link href="/login" style={{ color: "var(--gold-500)", textDecoration: "underline" }}>
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
}
