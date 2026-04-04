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

export default function OwnerScenariosPage() {
  const router = useRouter();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [filter, setFilter] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("filter") || "ALL";
    }
    return "ALL";
  });
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => setRole(d.role));
  }, []);

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

  const filtered = filter === "ALL" ? scenarios : scenarios.filter((s) => s.status === filter);

  const statusLabel = (s: string) => {
    switch (s) {
      case "PENDING": return "Oczekuje";
      case "ACCEPTED": return "Zaakceptowany";
      case "REJECTED": return "Odrzucony";
      case "RECORDED": return "Nagrano";
      default: return s;
    }
  };

  const filters = [
    { key: "ALL", label: "Wszystkie", count: scenarios.length },
    { key: "PENDING", label: "Oczekujące", count: scenarios.filter(s => s.status === "PENDING").length },
    { key: "ACCEPTED", label: "Gotowe do nagrań", count: scenarios.filter(s => s.status === "ACCEPTED").length },
    { key: "REJECTED", label: "Odrzucone", count: scenarios.filter(s => s.status === "REJECTED").length },
    { key: "RECORDED", label: "Nagrane", count: scenarios.filter(s => s.status === "RECORDED").length },
  ];

  return (
    <div className="flex flex-col flex-1" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: "rgba(9,9,11,0.8)",
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
          <div>
            <h1 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Scenariusze
            </h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {scenarios.length} {scenarios.length === 1 ? "scenariusz" : "scenariuszy"}
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 px-5 pb-3 overflow-x-auto no-scrollbar">
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
      </header>

      {/* Scenario List */}
      <main className="flex-1 px-5 py-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="spinner" style={{ width: 32, height: 32 }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}>
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Brak scenariuszy do wyświetlenia
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((scenario, i) => (
              <button
                key={scenario.id}
                onClick={() => setSelected(scenario)}
                className={`card card-accent w-full text-left p-4 animate-fade-in-up stagger-${Math.min(i + 1, 5)}`}
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                    {scenario.title}
                  </h3>
                  <span className={`badge badge-${scenario.status.toLowerCase()} shrink-0`}>
                    {statusLabel(scenario.status)}
                  </span>
                </div>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
                  {scenario.description}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)" }}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(scenario.createdAt).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Scenario Detail Drawer */}
      {selected && (
        <ScenarioDrawer
          scenario={selected}
          role={role}
          onClose={() => setSelected(null)}
          onUpdate={() => {
            setSelected(null);
            fetchScenarios();
          }}
        />
      )}
    </div>
  );
}

function ScenarioDrawer({
  scenario,
  role,
  onClose,
  onUpdate,
}: {
  scenario: Scenario;
  role: string;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [actionLoading, setActionLoading] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAction = async (status: "ACCEPTED" | "REJECTED") => {
    setActionLoading(true);
    try {
      await fetch(`/api/scenarios/${scenario.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          feedback: status === "REJECTED" ? feedback : null,
        }),
      });
      onUpdate();
    } catch {
      setActionLoading(false);
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case "PENDING": return "Oczekuje na decyzję";
      case "ACCEPTED": return "Zaakceptowany";
      case "REJECTED": return "Odrzucony";
      case "RECORDED": return "Nagrano pomyślnie";
      default: return s;
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="drawer" style={{ maxHeight: "85vh" }}>
        <div className="drawer-handle" />

        <div className="px-6 pb-8 relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-6 p-2 rounded-full transition-colors"
            style={{ color: "var(--text-muted)", background: "var(--bg-secondary)" }}
            aria-label="Zamknij"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Status */}
          <div className="flex items-center gap-2 mb-4 pr-12">
            <span className={`badge badge-${scenario.status.toLowerCase()}`}>
              {statusLabel(scenario.status)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold leading-tight mb-3" style={{ color: "var(--text-primary)" }}>
            {scenario.title}
          </h2>

          {/* Date */}
          <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
            Dodano:{" "}
            {new Date(scenario.createdAt).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {/* Description */}
          <div
            className="p-4 rounded-xl mb-6"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-secondary)" }}>
              {scenario.description}
            </p>
          </div>

          {/* Feedback (if rejected) */}
          {scenario.feedback && (
            <div
              className="p-4 rounded-xl mb-6"
              style={{
                background: "var(--status-rejected-bg)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--status-rejected)" }}>
                Powód odrzucenia
              </p>
              <p className="text-sm whitespace-pre-wrap" style={{ color: "var(--text-secondary)" }}>
                {scenario.feedback}
              </p>
            </div>
          )}

          {/* Actions (only for PENDING) */}
          {role === "owner" && scenario.status === "PENDING" && !showRejectForm && (
            <div className="flex gap-3">
              <button
                onClick={() => handleAction("ACCEPTED")}
                disabled={actionLoading}
                className="btn btn-success flex-1 h-12"
              >
                {actionLoading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Akceptuj
                  </>
                )}
              </button>
              <button
                onClick={() => setShowRejectForm(true)}
                disabled={actionLoading}
                className="btn btn-danger flex-1 h-12"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Odrzuć
              </button>
            </div>
          )}

          {/* Reject form */}
          {showRejectForm && (
            <div className="animate-fade-in-up">
              <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                Powód odrzucenia (opcjonalnie)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="input textarea mb-4"
                placeholder="Opisz co wymaga zmiany..."
                rows={3}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction("REJECTED")}
                  disabled={actionLoading}
                  className="btn btn-danger flex-1 h-12"
                >
                  {actionLoading ? <span className="spinner" /> : "Potwierdź odrzucenie"}
                </button>
                <button
                  onClick={() => {
                    setShowRejectForm(false);
                    setFeedback("");
                  }}
                  className="btn btn-secondary h-12"
                >
                  Anuluj
                </button>
              </div>
            </div>
          )}

          {/* Close button for non-pending or non-owners */}
          {(role !== "owner" || scenario.status !== "PENDING") && (
            <button onClick={onClose} className="btn btn-secondary w-full h-12">
              Zamknij
            </button>
          )}
        </div>
      </div>
    </>
  );
}
