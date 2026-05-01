"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TeamUser {
  id: string;
  username: string;
  role: "owner" | "editor" | "viewer";
  accountStatus: "active" | "pending" | "suspended";
  createdAt: string;
}

interface Invitation {
  id: string;
  code: string;
  role: string;
  accountStatus: string;
  usedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  usedBy?: { username: string } | null;
}

const roleLabels: Record<string, string> = {
  owner: "Właściciel",
  editor: "Scenarzysta",
  viewer: "Podgląd",
};

const statusLabels: Record<string, string> = {
  active: "Aktywne",
  pending: "Oczekuje",
  suspended: "Zablokowane",
};

export default function TeamPage() {
  const router = useRouter();
  const [users, setUsers] = useState<TeamUser[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [passwordUser, setPasswordUser] = useState<TeamUser | null>(null);
  const [password, setPassword] = useState("");
  const [deleteUser, setDeleteUser] = useState<TeamUser | null>(null);
  const [inviteRole, setInviteRole] = useState("editor");

  async function loadData() {
    setLoading(true);
    try {
      const [usersRes, invitationsRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/invitations"),
      ]);
      const usersData = await usersRes.json();
      const invitationsData = await invitationsRes.json();
      if (!usersRes.ok) throw new Error(usersData.error || "Nie udało się pobrać zespołu");
      setUsers(usersData);
      setInvitations(Array.isArray(invitationsData) ? invitationsData : []);
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Wystąpił błąd");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function updateUser(id: string, data: Partial<TeamUser> & { password?: string }) {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (!res.ok) {
      setToast(response.error || "Nie udało się zapisać zmiany");
      return;
    }
    setToast("Zapisano zmianę");
    await loadData();
  }

  async function removeUser() {
    if (!deleteUser) return;
    const res = await fetch(`/api/users/${deleteUser.id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setToast(data.error || "Nie udało się usunąć konta");
      return;
    }
    setDeleteUser(null);
    setToast("Usunięto konto");
    await loadData();
  }

  async function createInvitation() {
    const res = await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: inviteRole, accountStatus: "active" }),
    });
    const data = await res.json();
    if (!res.ok) {
      setToast(data.error || "Nie udało się utworzyć zaproszenia");
      return;
    }
    setToast(`Kod zaproszenia: ${data.code}`);
    await loadData();
  }

  return (
    <div className="workspace team-workspace">
      <div className="workspace-main">
        <header className="top-bar">
          <div>
            <p className="eyebrow">Owner PWA</p>
            <h1>Zespół i zaproszenia</h1>
          </div>
          <button className="primary-action" onClick={() => router.push("/")}>Wróć</button>
        </header>

        <main className="content-scroll">
          <div className="screen-stack">
            <section className="plain-panel">
              <div className="section-header">
                <h2>Nowe zaproszenie</h2>
                <span>{invitations.filter((invite) => !invite.usedAt).length}</span>
              </div>
              <div className="invite-row">
                <label className="sort-control">
                  <span>Rola po rejestracji</span>
                  <select value={inviteRole} onChange={(event) => setInviteRole(event.target.value)}>
                    <option value="editor">Scenarzysta</option>
                    <option value="viewer">Podgląd</option>
                    <option value="owner">Właściciel</option>
                  </select>
                </label>
                <button className="primary-action" onClick={createInvitation}>Utwórz kod</button>
              </div>
              <div className="invite-list">
                {invitations.slice(0, 6).map((invite) => (
                  <div key={invite.id} className="invite-code">
                    <strong>{invite.code}</strong>
                    <span>
                      {roleLabels[invite.role] || invite.role} ·{" "}
                      {invite.usedAt ? `użyte przez ${invite.usedBy?.username || "konto"}` : "aktywne"}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="plain-panel">
              <SectionTitle title="Członkowie zespołu" count={users.length} />
              {loading ? (
                <div className="app-loading"><div className="spinner" /></div>
              ) : (
                <div className="team-list">
                  {users.map((user) => (
                    <article key={user.id} className="team-row">
                      <div>
                        <strong>{user.username}</strong>
                        <p>Utworzone {new Date(user.createdAt).toLocaleDateString("pl-PL")}</p>
                      </div>
                      <label>
                        Rola
                        <select
                          value={user.role}
                          onChange={(event) =>
                            updateUser(user.id, { role: event.target.value as TeamUser["role"] })
                          }
                        >
                          <option value="owner">Właściciel</option>
                          <option value="editor">Scenarzysta</option>
                          <option value="viewer">Podgląd</option>
                        </select>
                      </label>
                      <label>
                        Status
                        <select
                          value={user.accountStatus}
                          onChange={(event) =>
                            updateUser(user.id, {
                              accountStatus: event.target.value as TeamUser["accountStatus"],
                            })
                          }
                        >
                          <option value="active">Aktywne</option>
                          <option value="pending">Oczekuje</option>
                          <option value="suspended">Zablokowane</option>
                        </select>
                      </label>
                      <div className="team-actions">
                        <span className="status-pill status-draft">
                          {roleLabels[user.role]} · {statusLabels[user.accountStatus]}
                        </span>
                        <button onClick={() => setPasswordUser(user)}>Hasło</button>
                        <button className="danger-link" onClick={() => setDeleteUser(user)}>Usuń</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {passwordUser && (
        <div className="sheet-overlay">
          <section className="bottom-sheet small-sheet">
            <div className="sheet-title-row">
              <button onClick={() => setPasswordUser(null)}>Wróć</button>
              <h2>Nowe hasło: {passwordUser.username}</h2>
            </div>
            <form
              className="scenario-form sheet-scroll"
              onSubmit={(event) => {
                event.preventDefault();
                void updateUser(passwordUser.id, { password });
                setPassword("");
                setPasswordUser(null);
              }}
            >
              <label>
                Hasło
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Min. 8 znaków, wielka litera i cyfra"
                />
              </label>
              <button className="primary-action" disabled={!password}>Zapisz</button>
            </form>
          </section>
        </div>
      )}

      {deleteUser && (
        <div className="sheet-overlay">
          <section className="bottom-sheet small-sheet">
            <div className="sheet-title-row">
              <button onClick={() => setDeleteUser(null)}>Wróć</button>
              <h2>Usunąć konto?</h2>
            </div>
            <div className="sheet-scroll scenario-form">
              <p>Usunięcie konta {deleteUser.username} jest trwałe. Historia scenariuszy zostaje w aplikacji.</p>
              <div className="sheet-actions">
                <button className="danger-link" onClick={removeUser}>Usuń konto</button>
                <button onClick={() => setDeleteUser(null)}>Anuluj</button>
              </div>
            </div>
          </section>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function SectionTitle({ title, count }: { title: string; count: number }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <span>{count}</span>
    </div>
  );
}
