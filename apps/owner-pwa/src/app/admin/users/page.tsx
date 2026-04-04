"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Zmienne do dialogów hasła
  const [passFormUser, setPassFormUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        setUsers(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole })
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Wystąpił błąd przy zmianie roli.");
      } else {
        await fetchUsers(); // Re-fetch
      }
    } catch (e) {
      alert("Wystąpił błąd z połączeniem.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passFormUser) return;
    
    try {
      const res = await fetch(`/api/users/${passFormUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Wystąpił błąd przy zmianie hasła.");
      } else {
        setPassFormUser(null);
        setNewPassword("");
        alert(`Hasło użytkownika ${passFormUser.username} zostało zmienione!`);
      }
    } catch {
      alert("Wystąpił błąd z połączeniem.");
    }
  };

  const handleDelete = async (id: string, username: string) => {
    if (!confirm(`UWAGA! Zmierzasz nieodwracalnie usunąć konto o loginie: ${username}. Na pewno?`)) return;
    
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error);
      } else {
        setUsers(users.filter((u) => u.id !== id));
      }
    } catch {
      alert("Błąd połączenia z serwerem.");
    }
  };

  const roleColors: Record<string, string> = {
    pending: "var(--status-pending)",
    admin: "var(--gold-500)",
    owner: "var(--status-recorded)",
    editor: "var(--accent-500)",
    viewer: "var(--text-secondary)",
  };

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
            <button onClick={() => router.push("/")} className="btn btn-ghost p-2 -ml-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                <span className="text-gold-gradient">Użytkownicy</span>
              </h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Zarządzanie kontami
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="flex-1 px-5 py-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="spinner" style={{ width: 32, height: 32 }} />
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((u, i) => (
              <div key={u.id} className={`card p-4 animate-fade-in-up stagger-${Math.min(i + 1, 5)} flex flex-col`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>{u.username}</h3>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Utworzone: {new Date(u.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap shrink-0" style={{ border: `1px solid ${roleColors[u.role] || "inherit"}`, color: roleColors[u.role] || "inherit" }}>
                    {u.role.toUpperCase()}
                  </div>
                </div>

                {/* Akcje / Zarządzenie */}
                <div className="flex flex-col gap-3 mt-auto border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "var(--text-muted)", minWidth: "50px" }}>ROLA:</span>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="input flex-1 text-xs sm:text-sm"
                      style={{ padding: "8px 12px", height: "auto", minHeight: "44px", lineHeight: "normal" }}
                    >
                      <option value="pending">PENDING</option>
                      <option value="viewer">VIEWER</option>
                      <option value="editor">EDITOR</option>
                      <option value="owner">OWNER</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setPassFormUser(u)} className="btn btn-secondary flex-1 h-9 text-xs">
                      Resetuj Hasło
                    </button>
                    <button onClick={() => handleDelete(u.id, u.username)} className="btn btn-danger h-9 px-3 text-xs flex justify-center items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Zmiany Hasła */}
      {passFormUser && (
        <>
          <div className="overlay" onClick={() => setPassFormUser(null)} />
          <div className="drawer flex flex-col" style={{ height: "40vh" }}>
            <div className="drawer-handle shrink-0" />
            <form onSubmit={handlePasswordSubmit} className="px-6 flex flex-col flex-1">
              <h2 className="text-lg font-bold mb-4">Zmiana hasła ({passFormUser.username})</h2>
              <input
                type="text"
                placeholder="Nowe hasło (min. 5 znaków)"
                className="input mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={5}
              />
              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary flex-1 h-12">Zapisz hasło</button>
                <button type="button" className="btn btn-secondary h-12" onClick={() => setPassFormUser(null)}>Anuluj</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
