"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Błąd logowania");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Błąd połączenia z serwerem");
      setLoading(false);
    }
  };

  return (
    <div className="dark flex flex-col flex-1 items-center justify-center px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,164,94,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-sm animate-fade-in-up" style={{ position: "relative", zIndex: 1 }}>
        {/* Logo / Brand */}
        <div className="text-center mb-10 relative">
          {/* Black blend gradient to hide hard edges of the logo's black background */}
          <div 
            className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[350px] h-[150px] pointer-events-none rounded-[100%]"
            style={{ background: "radial-gradient(ellipse at center, #000000 30%, transparent 75%)", filter: "blur(8px)", zIndex: -1 }}
          />
          <Image 
            key="login-logo"
            src="/logo.png" 
            alt="Logo Warszawski Czas" 
            width={300} 
            height={120} 
            priority
            className="h-[120px] w-[300px] object-contain mb-6 mx-auto animate-pulse-gold relative z-10" 
            style={{ mixBlendMode: "lighten" }}
          />
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            <span className="text-gold-gradient">Warszawski Czas</span>
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Panel zarządzania
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Wpisz login"
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
              placeholder="Wpisz hasło"
              autoComplete="current-password"
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
                Logowanie...
              </span>
            ) : (
              "Zaloguj się"
            )}
          </button>
        </form>

        {/* Footer hint */}
        <p className="text-center text-sm mt-8" style={{ color: "var(--text-muted)" }}>
          Nie masz konta?{" "}
          <a href="/register" style={{ color: "var(--gold-500)", textDecoration: "underline" }}>
            Zarejestruj się
          </a>
        </p>
      </div>
    </div>
  );
}
