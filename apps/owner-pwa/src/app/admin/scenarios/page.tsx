"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Scenario {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "RECORDED";
  feedback: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminScenariosPage() {
  const router = useRouter();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("filter") || "ALL";
    }
    return "ALL";
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchScenarios = useCallback(async () => {
    try {
      const res = await fetch("/api/scenarios");
      const data = await res.json();
      if (Array.isArray(data)) setScenarios(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      if (editingId) {
        await fetch(`/api/scenarios/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: formTitle, description: formDescription }),
        });
      } else {
        await fetch("/api/scenarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: formTitle, description: formDescription }),
        });
      }

      setFormTitle("");
      setFormDescription("");
      setShowForm(false);
      setEditingId(null);
      fetchScenarios();
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (scenario: Scenario) => {
    setEditingId(scenario.id);
    setFormTitle(scenario.title);
    setFormDescription(scenario.description);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/scenarios/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchScenarios();
    } catch {
      // error handled silently
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await fetch(`/api/scenarios/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, feedback: null }),
      });
      fetchScenarios();
    } catch {
      // error handled silently
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case "PENDING": return "Oczekuje na klienta";
      case "ACCEPTED": return "Zaakceptowany";
      case "REJECTED": return "Odrzucony";
      case "RECORDED": return "Nagrano";
      default: return s;
    }
  };

  const filters = [
    { key: "ALL", label: "Wszystkie", count: scenarios.length },
    { key: "PENDING", label: "Oczekujące", count: scenarios.filter(s => s.status === "PENDING").length },
    { key: "ACCEPTED", label: "Got. do nagrań", count: scenarios.filter(s => s.status === "ACCEPTED").length },
    { key: "REJECTED", label: "Odrzucone", count: scenarios.filter(s => s.status === "REJECTED").length },
    { key: "RECORDED", label: "Nagrane", count: scenarios.filter(s => s.status === "RECORDED").length },
  ];

  const filteredScenarios = filter === "ALL" ? scenarios : scenarios.filter(s => s.status === filter);

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
            <button onClick={() => router.push("/")} className="btn btn-ghost p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                <span className="text-gold-gradient">Scenariusze</span>
              </h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Zarządzanie — Admin
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormTitle("");
              setFormDescription("");
              setShowForm(true);
            }}
            className="btn btn-primary h-9 text-xs"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nowy
          </button>
        </div>
      </header>

      {/* Scenario List */}
      <main className="flex-1 px-5 py-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="spinner" style={{ width: 32, height: 32 }} />
          </div>
        ) : scenarios.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--text-muted)" }}>
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Brak scenariuszy
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              Dodaj pierwszy scenariusz
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Minimalistyczny Filtr */}
            <div className="flex overflow-x-auto gap-2 mb-4 pb-2 hide-scrollbar">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
                  style={{
                    background: filter === f.key ? "rgba(0,105,73,0.15)" : "transparent",
                    color: filter === f.key ? "var(--accent-500)" : "var(--text-muted)",
                    border: filter === f.key ? "1px solid rgba(0,105,73,0.25)" : "1px solid transparent",
                  }}
                >
                  {f.label} <span style={{ opacity: 0.7, marginLeft: 2 }}>({f.count})</span>
                </button>
              ))}
            </div>
            
            <div className="space-y-3">
              {filteredScenarios.map((scenario, i) => (
                <div
                  key={scenario.id}
                  className={`card p-4 animate-fade-in-up stagger-${Math.min(i + 1, 5)}`}
                >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-semibold leading-tight flex-1" style={{ color: "var(--text-primary)" }}>
                    {scenario.title}
                  </h3>
                  <span className={`badge badge-${scenario.status.toLowerCase()} shrink-0`}>
                    {statusLabel(scenario.status)}
                  </span>
                </div>

                <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "var(--text-muted)" }}>
                  {scenario.description}
                </p>

                {/* Feedback from owner */}
                {scenario.feedback && (
                  <div
                    className="p-3 rounded-lg mb-3 text-xs whitespace-pre-wrap"
                    style={{
                      background: "var(--status-rejected-bg)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span className="font-medium" style={{ color: "var(--status-rejected)" }}>
                      Feedback:
                    </span>{" "}
                    {scenario.feedback}
                  </div>
                )}

                {/* Actions and status-specific buttons */}
                {scenario.status === "ACCEPTED" && (
                  <div className="mb-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(scenario.id, "RECORDED");
                      }}
                      className="btn btn-success w-full h-10 text-xs flex justify-center items-center"
                    >
                       Oznacz jako Nagrane
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(scenario.createdAt).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(scenario)} className="btn btn-ghost text-xs p-2" title="Edytuj">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </button>
                    {deleteConfirm === scenario.id ? (
                      <div className="flex gap-1 items-center animate-fade-in">
                        <button onClick={() => handleDelete(scenario.id)} className="btn btn-danger text-xs h-8 px-3">
                          Usuń
                        </button>
                        <button onClick={() => setDeleteConfirm(null)} className="btn btn-ghost text-xs h-8 px-2">
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(scenario.id)} className="btn btn-ghost text-xs p-2" title="Usuń">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </main>

      {/* Create / Edit Drawer */}
      {showForm && (
        <>
          <div className="overlay" onClick={() => { setShowForm(false); setEditingId(null); }} />
          <div className="drawer flex flex-col" style={{ height: "90vh", maxHeight: "90vh" }}>
            <div className="drawer-handle shrink-0" />

            <form onSubmit={handleSubmit} className="px-6 pb-8 flex flex-col flex-1 overflow-hidden">
              <h2 className="text-lg font-bold mb-5 shrink-0" style={{ color: "var(--text-primary)" }}>
                {editingId ? "Edytuj scenariusz" : "Nowy scenariusz"}
              </h2>

              <div className="mb-4 shrink-0">
                <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                  Tytuł
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="input"
                  placeholder="Np. Prezentacja kolekcji wiosennej"
                  required
                />
              </div>

              <div className="mb-6 flex-1 flex flex-col min-h-0">
                <label className="block text-xs font-medium uppercase tracking-wider mb-2 shrink-0" style={{ color: "var(--text-muted)" }}>
                  Opis scenariusza
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="input textarea flex-1 resize-none"
                  placeholder="Opisz szczegóły scenariusza — ujęcia, nastrój, kluczowe momenty..."
                  required
                />
              </div>

              <div className="flex gap-3 shrink-0">
                <button type="submit" disabled={formLoading} className="btn btn-primary flex-1 h-12">
                  {formLoading ? (
                    <span className="spinner" style={{ borderTopColor: "#0a0a0a", borderColor: "rgba(0,0,0,0.2)" }} />
                  ) : editingId ? (
                    "Zapisz zmiany"
                  ) : (
                    "Utwórz scenariusz"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="btn btn-secondary h-12"
                >
                  Anuluj
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
