"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type View = "today" | "scenarios" | "recordings" | "more";
type Role = "owner" | "editor" | "viewer";
type AccountStatus = "active" | "pending" | "suspended";
type ScenarioStatus =
  | "draft"
  | "in_review"
  | "changes_requested"
  | "accepted"
  | "ready_to_record"
  | "recorded"
  | "archived";

interface UserInfo {
  id: string;
  username: string;
  role: Role;
  accountStatus: AccountStatus;
}

interface ScenarioComment {
  id: string;
  authorName: string;
  type: string;
  body: string;
  createdAt: string;
}

interface ScenarioActivity {
  id: string;
  actorName: string;
  action: string;
  fromStatus: string | null;
  toStatus: string | null;
  note: string | null;
  createdAt: string;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  ownerNote: string | null;
  attachmentsNote?: string | null;
  status: ScenarioStatus;
  statusLabel: string;
  statusTone: "neutral" | "warning" | "success" | "danger" | "info";
  nextAction: string;
  allowedTransitions: ScenarioStatus[];
  priority: "normal" | "high";
  version: number;
  dueAt: string | null;
  recordingDate: string | null;
  authorId: string | null;
  author: { id: string; username: string; role: string } | null;
  comments: ScenarioComment[];
  activities: ScenarioActivity[];
  createdAt: string;
  updatedAt: string;
}

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  readAt: string | null;
  createdAt: string;
  scenarioId: string | null;
}

const VIEW_LABELS: Record<View, string> = {
  today: "Dzisiaj",
  scenarios: "Scenariusze",
  recordings: "Nagrania",
  more: "Wiecej",
};

const ROLE_LABELS: Record<Role, string> = {
  owner: "Wlasciciel",
  editor: "Scenarzysta",
  viewer: "Podglad",
};

const STATUS_FILTERS: Array<{ key: "all" | ScenarioStatus; label: string }> = [
  { key: "all", label: "Wszystkie" },
  { key: "draft", label: "Robocze" },
  { key: "in_review", label: "Do recenzji" },
  { key: "changes_requested", label: "Poprawki" },
  { key: "accepted", label: "Zaakceptowane" },
  { key: "ready_to_record", label: "Do nagrania" },
  { key: "recorded", label: "Nagrane" },
];

function formatDate(value: string | null | undefined, withTime = false) {
  if (!value) return "Brak terminu";
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "short",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(value));
}

function isFormTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

function statusClass(status: ScenarioStatus) {
  return `status-pill status-${status}`;
}

export default function OwnerWorkspace({ initialView = "today" }: { initialView?: View }) {
  const router = useRouter();
  const mainRef = useRef<HTMLElement | null>(null);
  const [view, setView] = useState<View>(initialView);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationUnread, setNotificationUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [formScenario, setFormScenario] = useState<Scenario | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | ScenarioStatus>("all");
  const [sort, setSort] = useState<"updated" | "due">("updated");
  const [pullStart, setPullStart] = useState<number | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [edgeStart, setEdgeStart] = useState<number | null>(null);
  const [edgeDistance, setEdgeDistance] = useState(0);

  const loadNotifications = useCallback(async () => {
    const res = await fetch("/api/notifications");
    if (!res.ok) return;
    const data = await res.json();
    setNotifications(data.notifications || []);
    setNotificationUnread(data.unread || 0);
  }, []);

  const loadAll = useCallback(async () => {
    setError("");
    const meRes = await fetch("/api/auth/me");
    if (!meRes.ok) {
      router.push("/login");
      return;
    }

    const me = await meRes.json();
    setUser(me.user);

    const scenariosRes = await fetch("/api/scenarios");
    const scenarioData = await scenariosRes.json();
    if (!scenariosRes.ok) {
      throw new Error(scenarioData.error || "Nie udalo sie pobrac scenariuszy");
    }
    setScenarios(Array.isArray(scenarioData) ? scenarioData : []);
    await loadNotifications();
  }, [loadNotifications, router]);

  useEffect(() => {
    loadAll()
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [loadAll]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const visibleScenarios = useMemo(() => {
    const filtered =
      filter === "all"
        ? scenarios.filter((scenario) => scenario.status !== "archived")
        : scenarios.filter((scenario) => scenario.status === filter);
    return [...filtered].sort((a, b) => {
      if (sort === "due") {
        const aTime = a.dueAt ? new Date(a.dueAt).getTime() : Number.MAX_SAFE_INTEGER;
        const bTime = b.dueAt ? new Date(b.dueAt).getTime() : Number.MAX_SAFE_INTEGER;
        return aTime - bTime;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [filter, scenarios, sort]);

  const queues = useMemo(
    () => ({
      review: scenarios.filter((scenario) => scenario.status === "in_review"),
      changes: scenarios.filter((scenario) => scenario.status === "changes_requested"),
      ready: scenarios.filter((scenario) => scenario.status === "ready_to_record"),
      accepted: scenarios.filter((scenario) => scenario.status === "accepted"),
      recorded: scenarios.filter((scenario) => scenario.status === "recorded"),
    }),
    [scenarios]
  );

  const latestActivities = useMemo(
    () =>
      scenarios
        .flatMap((scenario) =>
          scenario.activities.map((activity) => ({
            ...activity,
            scenarioTitle: scenario.title,
          }))
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6),
    [scenarios]
  );

  const refresh = useCallback(async () => {
    setBusy("refresh");
    try {
      await loadAll();
      setToast("Odświeżono dane");
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Nie udalo sie odswiezyc");
    } finally {
      setBusy(null);
    }
  }, [loadAll]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  async function transitionScenario(id: string, status: ScenarioStatus, comment?: string) {
    setBusy(`${id}:${status}`);
    try {
      const res = await fetch(`/api/scenarios/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Nie udalo sie wykonac akcji");

      setScenarios((current) => current.map((scenario) => (scenario.id === id ? data : scenario)));
      setSelected((current) => (current?.id === id ? data : current));
      setToast("Zmieniono status scenariusza");
      await loadNotifications();
    } catch (actionError) {
      setToast(actionError instanceof Error ? actionError.message : "Wystapil blad");
    } finally {
      setBusy(null);
    }
  }

  async function archiveScenario(id: string) {
    setBusy(`${id}:archive`);
    try {
      const res = await fetch(`/api/scenarios/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Nie udalo sie zarchiwizowac");
      setScenarios((current) => current.filter((scenario) => scenario.id !== id));
      setSelected(null);
      setToast("Przeniesiono do archiwum");
    } catch (archiveError) {
      setToast(archiveError instanceof Error ? archiveError.message : "Wystapil blad");
    } finally {
      setBusy(null);
    }
  }

  async function submitComment(id: string, body: string) {
    setBusy(`${id}:comment`);
    try {
      const res = await fetch(`/api/scenarios/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Nie udalo sie dodac komentarza");
      await loadAll();
      setSelected((current) =>
        current ? { ...current, comments: [...current.comments, data] } : current
      );
      setToast("Dodano komentarz");
    } catch (commentError) {
      setToast(commentError instanceof Error ? commentError.message : "Wystapil blad");
    } finally {
      setBusy(null);
    }
  }

  async function saveScenario(input: ScenarioFormInput, submitForReview: boolean) {
    setBusy("form");
    try {
      const endpoint = formScenario ? `/api/scenarios/${formScenario.id}` : "/api/scenarios";
      const method = formScenario ? "PUT" : "POST";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, submitForReview }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Nie udalo sie zapisac scenariusza");

      setScenarios((current) => {
        if (formScenario) {
          return current.map((scenario) => (scenario.id === data.id ? data : scenario));
        }
        return [data, ...current];
      });
      setIsFormOpen(false);
      setFormScenario(null);
      setToast(submitForReview ? "Wysłano do recenzji" : "Zapisano roboczo");
      await loadNotifications();
    } catch (saveError) {
      setToast(saveError instanceof Error ? saveError.message : "Wystapil blad");
    } finally {
      setBusy(null);
    }
  }

  async function markNotificationRead(id: string) {
    await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    await loadNotifications();
  }

  function openForm(scenario?: Scenario) {
    setFormScenario(scenario ?? null);
    setIsFormOpen(true);
  }

  function closeTopLayer() {
    if (isFormOpen) {
      setIsFormOpen(false);
      setFormScenario(null);
      return true;
    }
    if (selected) {
      setSelected(null);
      return true;
    }
    return false;
  }

  function handleEdgeStart(event: React.TouchEvent) {
    if (isFormTarget(event.target)) return;
    const touch = event.touches[0];
    if (touch.clientX <= 26 && (selected || isFormOpen)) {
      setEdgeStart(touch.clientX);
      setEdgeDistance(0);
    }
  }

  function handleEdgeMove(event: React.TouchEvent) {
    if (edgeStart === null) return;
    const distance = Math.max(0, event.touches[0].clientX - edgeStart);
    setEdgeDistance(Math.min(distance, 120));
  }

  function handleEdgeEnd() {
    if (edgeStart !== null && edgeDistance > 74) closeTopLayer();
    setEdgeStart(null);
    setEdgeDistance(0);
  }

  function handlePullStart(event: React.TouchEvent) {
    if (isFormTarget(event.target)) return;
    if (mainRef.current?.scrollTop === 0) setPullStart(event.touches[0].clientY);
  }

  function handlePullMove(event: React.TouchEvent) {
    if (pullStart === null) return;
    const distance = Math.max(0, event.touches[0].clientY - pullStart);
    setPullDistance(Math.min(distance, 92));
  }

  function handlePullEnd() {
    if (pullDistance > 72) void refresh();
    setPullStart(null);
    setPullDistance(0);
  }

  const title = VIEW_LABELS[view];
  const canCreate = user?.role === "owner" || user?.role === "editor";
  const canManageUsers = user?.role === "owner";

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner" />
        <p>Ładowanie pracy...</p>
      </div>
    );
  }

  return (
    <div
      className="workspace"
      onTouchStart={handleEdgeStart}
      onTouchMove={handleEdgeMove}
      onTouchEnd={handleEdgeEnd}
    >
      <aside className="side-nav" aria-label="Główna nawigacja">
        <BrandBlock user={user} />
        <NavButtons view={view} setView={setView} unread={notificationUnread} />
      </aside>

      <div className="workspace-main">
        <header className="top-bar">
          <div>
            <p className="eyebrow">{user ? ROLE_LABELS[user.role] : "Owner PWA"}</p>
            <h1>{title}</h1>
          </div>
          <div className="top-actions">
            <button className="icon-button" onClick={() => setView("more")} aria-label="Powiadomienia">
              <span className="bell-shape" />
              {notificationUnread > 0 && <span className="button-badge">{notificationUnread}</span>}
            </button>
            {canCreate && (
              <button className="primary-action" onClick={() => openForm()}>
                Nowy scenariusz
              </button>
            )}
          </div>
        </header>

        <main
          ref={mainRef}
          className="content-scroll"
          onTouchStart={handlePullStart}
          onTouchMove={handlePullMove}
          onTouchEnd={handlePullEnd}
        >
          <div className="pull-indicator" style={{ height: pullDistance }}>
            {pullDistance > 72 ? "Puść, aby odświeżyć" : "Pociągnij, aby odświeżyć"}
          </div>

          {error && (
            <div className="notice notice-error">
              <span>{error}</span>
              <button onClick={refresh}>Ponów</button>
            </div>
          )}

          {view === "today" && (
            <TodayView
              user={user}
              queues={queues}
              latestActivities={latestActivities}
              onSelect={setSelected}
              onCreate={() => openForm()}
              onTransition={transitionScenario}
              busy={busy}
            />
          )}

          {view === "scenarios" && (
            <ScenarioListView
              scenarios={visibleScenarios}
              allScenarios={scenarios}
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              onSelect={setSelected}
              onCreate={() => openForm()}
              onTransition={transitionScenario}
              busy={busy}
            />
          )}

          {view === "recordings" && (
            <RecordingsView
              ready={queues.ready}
              accepted={queues.accepted}
              recorded={queues.recorded}
              onSelect={setSelected}
              onTransition={transitionScenario}
              busy={busy}
            />
          )}

          {view === "more" && (
            <MoreView
              user={user}
              notifications={notifications}
              canManageUsers={canManageUsers}
              onRead={markNotificationRead}
              onSettings={() => router.push("/settings")}
              onUsers={() => router.push("/admin/users")}
              onRefresh={refresh}
              onLogout={logout}
            />
          )}
        </main>
      </div>

      <nav className="bottom-nav" aria-label="Dolna nawigacja">
        <NavButtons view={view} setView={setView} unread={notificationUnread} compact />
      </nav>

      {selected && (
        <ScenarioDetailSheet
          scenario={selected}
          user={user}
          busy={busy}
          onClose={() => setSelected(null)}
          onEdit={() => openForm(selected)}
          onArchive={() => archiveScenario(selected.id)}
          onTransition={transitionScenario}
          onComment={submitComment}
        />
      )}

      {isFormOpen && (
        <ScenarioFormSheet
          scenario={formScenario}
          busy={busy === "form"}
          onClose={() => {
            setIsFormOpen(false);
            setFormScenario(null);
          }}
          onSave={saveScenario}
        />
      )}

      {edgeDistance > 0 && (
        <div className="edge-feedback" style={{ width: edgeDistance }}>
          Wróć
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function BrandBlock({ user }: { user: UserInfo | null }) {
  return (
    <div className="brand-block">
      <div className="brand-mark">WC</div>
      <div>
        <strong>Owner PWA</strong>
        <span>{user?.username || "Warszawski Czas"}</span>
      </div>
    </div>
  );
}

function NavButtons({
  view,
  setView,
  unread,
  compact = false,
}: {
  view: View;
  setView: (view: View) => void;
  unread: number;
  compact?: boolean;
}) {
  const items: Array<{ key: View; label: string; mark?: number }> = [
    { key: "today", label: "Dzisiaj" },
    { key: "scenarios", label: "Scenariusze" },
    { key: "recordings", label: "Nagrania" },
    { key: "more", label: "Wiecej", mark: unread },
  ];

  return (
    <div className={compact ? "nav-buttons compact" : "nav-buttons"}>
      {items.map((item) => (
        <button
          key={item.key}
          className={view === item.key ? "active" : ""}
          onClick={() => setView(item.key)}
        >
          <span className={`nav-icon nav-${item.key}`} />
          <span>{item.label}</span>
          {Boolean(item.mark) && <span className="nav-badge">{item.mark}</span>}
        </button>
      ))}
    </div>
  );
}

function TodayView({
  user,
  queues,
  latestActivities,
  onSelect,
  onCreate,
  onTransition,
  busy,
}: {
  user: UserInfo | null;
  queues: {
    review: Scenario[];
    changes: Scenario[];
    ready: Scenario[];
    accepted: Scenario[];
    recorded: Scenario[];
  };
  latestActivities: Array<ScenarioActivity & { scenarioTitle: string }>;
  onSelect: (scenario: Scenario) => void;
  onCreate: () => void;
  onTransition: (id: string, status: ScenarioStatus, comment?: string) => void;
  busy: string | null;
}) {
  const primaryText =
    user?.role === "owner"
      ? queues.review.length
        ? "Przejrzyj pierwszą decyzję"
        : "Sprawdź scenariusze"
      : user?.role === "editor"
        ? queues.changes.length
          ? "Popraw pierwszy scenariusz"
          : "Utwórz scenariusz"
        : "Zobacz scenariusze";

  return (
    <div className="screen-stack">
      <section className="focus-strip">
        <div>
          <p className="eyebrow">Najbliższy krok</p>
          <h2>{primaryText}</h2>
          <p>
            {queues.review.length} do decyzji, {queues.changes.length} do poprawek,{" "}
            {queues.ready.length} gotowe do nagrania.
          </p>
        </div>
        <button
          className="primary-action"
          onClick={() => {
            if (user?.role === "editor" && queues.changes[0]) onSelect(queues.changes[0]);
            else if (user?.role === "owner" && queues.review[0]) onSelect(queues.review[0]);
            else if (user?.role === "editor") onCreate();
          }}
        >
          Otwórz
        </button>
      </section>

      <ScenarioSection
        title="Do decyzji właściciela"
        scenarios={queues.review}
        empty="Nic nie czeka na decyzję."
        onSelect={onSelect}
        onTransition={onTransition}
        busy={busy}
      />
      <ScenarioSection
        title="Wróciły do poprawek"
        scenarios={queues.changes}
        empty="Brak scenariuszy do poprawienia."
        onSelect={onSelect}
        onTransition={onTransition}
        busy={busy}
      />
      <ScenarioSection
        title="Gotowe do nagrania"
        scenarios={queues.ready}
        empty="Jeszcze nic nie czeka na nagranie."
        onSelect={onSelect}
        onTransition={onTransition}
        busy={busy}
      />

      <section className="activity-list">
        <SectionHeader title="Ostatnie aktywności" count={latestActivities.length} />
        {latestActivities.length === 0 ? (
          <EmptyState text="Historia pojawi się po pierwszej decyzji albo komentarzu." />
        ) : (
          latestActivities.map((activity) => (
            <div key={activity.id} className="activity-row">
              <span className="activity-dot" />
              <div>
                <strong>{activity.scenarioTitle}</strong>
                <p>{activity.actorName} - {activityLabel(activity)}</p>
              </div>
              <time>{formatDate(activity.createdAt, true)}</time>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

function ScenarioListView({
  scenarios,
  allScenarios,
  filter,
  setFilter,
  sort,
  setSort,
  onSelect,
  onCreate,
  onTransition,
  busy,
}: {
  scenarios: Scenario[];
  allScenarios: Scenario[];
  filter: "all" | ScenarioStatus;
  setFilter: (filter: "all" | ScenarioStatus) => void;
  sort: "updated" | "due";
  setSort: (sort: "updated" | "due") => void;
  onSelect: (scenario: Scenario) => void;
  onCreate: () => void;
  onTransition: (id: string, status: ScenarioStatus, comment?: string) => void;
  busy: string | null;
}) {
  return (
    <div className="screen-stack">
      <div className="toolbar-row">
        <div className="status-tabs">
          {STATUS_FILTERS.map((item) => {
            const count =
              item.key === "all"
                ? allScenarios.filter((scenario) => scenario.status !== "archived").length
                : allScenarios.filter((scenario) => scenario.status === item.key).length;
            return (
              <button
                key={item.key}
                className={filter === item.key ? "active" : ""}
                onClick={() => setFilter(item.key)}
              >
                {item.label} <span>{count}</span>
              </button>
            );
          })}
        </div>
        <label className="sort-control">
          <span>Sortuj</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as "updated" | "due")}>
            <option value="updated">Ostatnia aktywność</option>
            <option value="due">Termin</option>
          </select>
        </label>
      </div>

      {scenarios.length === 0 ? (
        <EmptyState
          text="Nie ma tu scenariuszy."
          action="Dodaj pierwszy scenariusz"
          onAction={onCreate}
        />
      ) : (
        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onSelect={onSelect}
              onTransition={onTransition}
              busy={busy}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RecordingsView({
  ready,
  accepted,
  recorded,
  onSelect,
  onTransition,
  busy,
}: {
  ready: Scenario[];
  accepted: Scenario[];
  recorded: Scenario[];
  onSelect: (scenario: Scenario) => void;
  onTransition: (id: string, status: ScenarioStatus, comment?: string) => void;
  busy: string | null;
}) {
  return (
    <div className="screen-stack">
      <ScenarioSection
        title="Zaakceptowane"
        scenarios={accepted}
        empty="Po akceptacji scenariusze trafią tutaj przed oznaczeniem gotowości."
        onSelect={onSelect}
        onTransition={onTransition}
        busy={busy}
      />
      <ScenarioSection
        title="Gotowe do nagrania"
        scenarios={ready}
        empty="Brak materiałów gotowych do nagrania."
        onSelect={onSelect}
        onTransition={onTransition}
        busy={busy}
      />
      <ScenarioSection
        title="Nagrane"
        scenarios={recorded}
        empty="Nagrane materiały pojawią się na tej liście."
        onSelect={onSelect}
        onTransition={onTransition}
        busy={busy}
      />
    </div>
  );
}

function MoreView({
  user,
  notifications,
  canManageUsers,
  onRead,
  onSettings,
  onUsers,
  onRefresh,
  onLogout,
}: {
  user: UserInfo | null;
  notifications: NotificationItem[];
  canManageUsers: boolean;
  onRead: (id: string) => void;
  onSettings: () => void;
  onUsers: () => void;
  onRefresh: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="screen-stack">
      <section className="plain-panel">
        <div className="profile-row">
          <div className="avatar">{user?.username.slice(0, 2).toUpperCase() || "WC"}</div>
          <div>
            <strong>{user?.username}</strong>
            <p>{user ? ROLE_LABELS[user.role] : ""}</p>
          </div>
        </div>
        <div className="more-actions">
          <button onClick={onSettings}>Ustawienia konta</button>
          {canManageUsers && <button onClick={onUsers}>Zespół i zaproszenia</button>}
          <button onClick={onRefresh}>Odśwież dane</button>
          <button className="danger-link" onClick={onLogout}>Wyloguj</button>
        </div>
      </section>

      <section className="activity-list">
        <SectionHeader title="Powiadomienia" count={notifications.length} />
        {notifications.length === 0 ? (
          <EmptyState text="Brak powiadomień." />
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-row ${notification.readAt ? "" : "unread"}`}
            >
              <div>
                <strong>{notification.title}</strong>
                <p>{notification.body}</p>
                <time>{formatDate(notification.createdAt, true)}</time>
              </div>
              {!notification.readAt && <button onClick={() => onRead(notification.id)}>Odczytane</button>}
            </div>
          ))
        )}
      </section>
    </div>
  );
}

function ScenarioSection({
  title,
  scenarios,
  empty,
  onSelect,
  onTransition,
  busy,
}: {
  title: string;
  scenarios: Scenario[];
  empty: string;
  onSelect: (scenario: Scenario) => void;
  onTransition: (id: string, status: ScenarioStatus, comment?: string) => void;
  busy: string | null;
}) {
  return (
    <section className="work-section">
      <SectionHeader title={title} count={scenarios.length} />
      {scenarios.length === 0 ? (
        <EmptyState text={empty} />
      ) : (
        <div className="scenario-list">
          {scenarios.slice(0, 5).map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onSelect={onSelect}
              onTransition={onTransition}
              busy={busy}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <span>{count}</span>
    </div>
  );
}

function EmptyState({
  text,
  action,
  onAction,
}: {
  text: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="empty-state">
      <p>{text}</p>
      {action && onAction && <button onClick={onAction}>{action}</button>}
    </div>
  );
}

function ScenarioCard({
  scenario,
  onSelect,
  onTransition,
  busy,
}: {
  scenario: Scenario;
  onSelect: (scenario: Scenario) => void;
  onTransition: (id: string, status: ScenarioStatus, comment?: string) => void;
  busy: string | null;
}) {
  const [startX, setStartX] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const isBusy = Boolean(busy?.startsWith(scenario.id));

  function handleTouchMove(event: React.TouchEvent) {
    if (startX === null) return;
    const delta = event.touches[0].clientX - startX;
    if (Math.abs(delta) > 16) setOffset(Math.max(-96, Math.min(0, delta)));
  }

  function handleTouchEnd() {
    setOffset(offset < -56 ? -80 : 0);
    setStartX(null);
  }

  return (
    <article className="scenario-card-wrap">
      <div className="swipe-back-actions">
        <QuickAction scenario={scenario} onTransition={onTransition} busy={isBusy} compact />
      </div>
      <button
        className="scenario-card"
        style={{ transform: `translateX(${offset}px)` }}
        onTouchStart={(event) => setStartX(event.touches[0].clientX)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => onSelect(scenario)}
      >
        <div className="card-title-row">
          <h3>{scenario.title}</h3>
          <span className={statusClass(scenario.status)}>{scenario.statusLabel}</span>
        </div>
        <p className="scenario-summary">{scenario.description}</p>
        <div className="card-meta">
          <span>Autor: {scenario.author?.username || "brak"}</span>
          <span>v{scenario.version}</span>
          <span>{formatDate(scenario.dueAt)}</span>
        </div>
        <div className="next-action">{scenario.nextAction}</div>
        <QuickAction scenario={scenario} onTransition={onTransition} busy={isBusy} />
      </button>
    </article>
  );
}

function QuickAction({
  scenario,
  onTransition,
  busy,
  compact = false,
}: {
  scenario: Scenario;
  onTransition: (id: string, status: ScenarioStatus, comment?: string) => void;
  busy: boolean;
  compact?: boolean;
}) {
  const next =
    scenario.status === "draft" || scenario.status === "changes_requested"
      ? "in_review"
      : scenario.status === "accepted"
        ? "ready_to_record"
        : scenario.status === "ready_to_record"
          ? "recorded"
          : null;
  if (!next || !scenario.allowedTransitions.includes(next)) return null;

  const label =
    next === "in_review"
      ? "Wyślij"
      : next === "ready_to_record"
        ? "Do nagrania"
        : "Nagrane";

  return (
    <button
      className={compact ? "quick-action compact" : "quick-action"}
      disabled={busy}
      onClick={(event) => {
        event.stopPropagation();
        onTransition(scenario.id, next);
      }}
    >
      {busy ? "..." : label}
    </button>
  );
}

function ScenarioDetailSheet({
  scenario,
  user,
  busy,
  onClose,
  onEdit,
  onArchive,
  onTransition,
  onComment,
}: {
  scenario: Scenario;
  user: UserInfo | null;
  busy: string | null;
  onClose: () => void;
  onEdit: () => void;
  onArchive: () => void;
  onTransition: (id: string, status: ScenarioStatus, comment?: string) => void;
  onComment: (id: string, body: string) => void;
}) {
  const [reviewComment, setReviewComment] = useState("");
  const [comment, setComment] = useState("");
  const [confirmArchive, setConfirmArchive] = useState(false);
  const isBusy = Boolean(busy?.startsWith(scenario.id));

  return (
    <BottomSheet onClose={onClose} title={scenario.title}>
      <div className="detail-layout">
        <div className="detail-hero">
          <span className={statusClass(scenario.status)}>{scenario.statusLabel}</span>
          <h2>{scenario.title}</h2>
          <p>{scenario.nextAction}</p>
          <div className="detail-meta">
            <span>Autor: {scenario.author?.username || "brak"}</span>
            <span>Wersja {scenario.version}</span>
            <span>Termin: {formatDate(scenario.dueAt)}</span>
          </div>
        </div>

        <section className="readable-script">
          <h3>Treść scenariusza</h3>
          <p>{scenario.description}</p>
        </section>

        {scenario.ownerNote && (
          <section className="plain-panel">
            <h3>Kontekst dla właściciela</h3>
            <p>{scenario.ownerNote}</p>
          </section>
        )}

        <DecisionActions
          scenario={scenario}
          user={user}
          reviewComment={reviewComment}
          setReviewComment={setReviewComment}
          busy={isBusy}
          onTransition={onTransition}
        />

        <section className="plain-panel">
          <div className="section-header">
            <h3>Komentarze i decyzje</h3>
            <span>{scenario.comments.length}</span>
          </div>
          {scenario.comments.length === 0 ? (
            <EmptyState text="Komentarze pojawią się po recenzji albo rozmowie zespołu." />
          ) : (
            <div className="thread">
              {scenario.comments.map((item) => (
                <div key={item.id} className="thread-item">
                  <strong>{item.authorName}</strong>
                  <p>{item.body}</p>
                  <time>{formatDate(item.createdAt, true)}</time>
                </div>
              ))}
            </div>
          )}
          {user?.role !== "viewer" && (
            <form
              className="comment-form"
              onSubmit={(event) => {
                event.preventDefault();
                if (!comment.trim()) return;
                onComment(scenario.id, comment);
                setComment("");
              }}
            >
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Dodaj krótki komentarz..."
              />
              <button type="submit" disabled={isBusy}>Dodaj</button>
            </form>
          )}
        </section>

        <section className="activity-list compact-list">
          <SectionHeader title="Oś czasu" count={scenario.activities.length} />
          {scenario.activities.map((activity) => (
            <div key={activity.id} className="activity-row">
              <span className="activity-dot" />
              <div>
                <strong>{activity.actorName}</strong>
                <p>{activityLabel(activity)}</p>
              </div>
              <time>{formatDate(activity.createdAt, true)}</time>
            </div>
          ))}
        </section>

        <div className="sheet-actions">
          {user?.role !== "viewer" && <button onClick={onEdit}>Edytuj</button>}
          {!confirmArchive ? (
            <button className="danger-link" onClick={() => setConfirmArchive(true)}>
              Archiwizuj
            </button>
          ) : (
            <div className="confirm-row">
              <span>Przenieść do archiwum?</span>
              <button className="danger-link" onClick={onArchive}>Tak</button>
              <button onClick={() => setConfirmArchive(false)}>Nie</button>
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}

function DecisionActions({
  scenario,
  user,
  reviewComment,
  setReviewComment,
  busy,
  onTransition,
}: {
  scenario: Scenario;
  user: UserInfo | null;
  reviewComment: string;
  setReviewComment: (value: string) => void;
  busy: boolean;
  onTransition: (id: string, status: ScenarioStatus, comment?: string) => void;
}) {
  if (scenario.status === "in_review" && user?.role === "owner") {
    return (
      <section className="decision-panel">
        <h3>Decyzja właściciela</h3>
        <div className="decision-buttons">
          <button
            className="success-button"
            disabled={busy}
            onClick={() => onTransition(scenario.id, "accepted")}
          >
            Akceptuj
          </button>
        </div>
        <label>
          Komentarz do poprawek
          <textarea
            value={reviewComment}
            onChange={(event) => setReviewComment(event.target.value)}
            placeholder="Napisz konkretnie, co zespół ma poprawić..."
          />
        </label>
        <button
          className="danger-button"
          disabled={busy || !reviewComment.trim()}
          onClick={() => {
            onTransition(scenario.id, "changes_requested", reviewComment);
            setReviewComment("");
          }}
        >
          Odeślij do poprawek
        </button>
      </section>
    );
  }

  if (scenario.status === "accepted" && scenario.allowedTransitions.includes("ready_to_record")) {
    return (
      <section className="decision-panel">
        <h3>Następny krok</h3>
        <button disabled={busy} onClick={() => onTransition(scenario.id, "ready_to_record")}>
          Oznacz jako gotowy do nagrania
        </button>
      </section>
    );
  }

  if (scenario.status === "ready_to_record" && scenario.allowedTransitions.includes("recorded")) {
    return (
      <section className="decision-panel">
        <h3>Realizacja</h3>
        <button disabled={busy} onClick={() => onTransition(scenario.id, "recorded")}>
          Oznacz materiał jako nagrany
        </button>
      </section>
    );
  }

  if (
    (scenario.status === "draft" || scenario.status === "changes_requested") &&
    scenario.allowedTransitions.includes("in_review")
  ) {
    return (
      <section className="decision-panel">
        <h3>Wysyłka do recenzji</h3>
        <button disabled={busy} onClick={() => onTransition(scenario.id, "in_review")}>
          Wyślij do właściciela
        </button>
      </section>
    );
  }

  return null;
}

interface ScenarioFormInput {
  title: string;
  description: string;
  ownerNote: string;
  dueAt: string;
  priority: "normal" | "high";
}

function ScenarioFormSheet({
  scenario,
  busy,
  onClose,
  onSave,
}: {
  scenario: Scenario | null;
  busy: boolean;
  onClose: () => void;
  onSave: (input: ScenarioFormInput, submitForReview: boolean) => void;
}) {
  const [input, setInput] = useState<ScenarioFormInput>({
    title: scenario?.title || "",
    description: scenario?.description || "",
    ownerNote: scenario?.ownerNote || "",
    dueAt: scenario?.dueAt ? scenario.dueAt.slice(0, 10) : "",
    priority: scenario?.priority || "normal",
  });

  const canSubmit = input.title.trim().length > 2 && input.description.trim().length > 8;

  return (
    <BottomSheet onClose={onClose} title={scenario ? "Edycja scenariusza" : "Nowy scenariusz"}>
      <form
        className="scenario-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit) onSave(input, false);
        }}
      >
        <label>
          Tytuł
          <input
            value={input.title}
            onChange={(event) => setInput({ ...input, title: event.target.value })}
            placeholder="Np. Prezentacja modelu Datejust"
          />
        </label>
        <label>
          Opis scenariusza
          <textarea
            value={input.description}
            onChange={(event) => setInput({ ...input, description: event.target.value })}
            placeholder="Opis ujęć, tempa, tonu i najważniejszych kadrów..."
            rows={8}
          />
        </label>
        <label>
          Notatka dla właściciela
          <textarea
            value={input.ownerNote}
            onChange={(event) => setInput({ ...input, ownerNote: event.target.value })}
            placeholder="Co właściciel ma ocenić albo wiedzieć przed decyzją?"
            rows={3}
          />
        </label>
        <div className="form-grid">
          <label>
            Termin
            <input
              type="date"
              value={input.dueAt}
              onChange={(event) => setInput({ ...input, dueAt: event.target.value })}
            />
          </label>
          <label>
            Priorytet
            <select
              value={input.priority}
              onChange={(event) =>
                setInput({ ...input, priority: event.target.value as "normal" | "high" })
              }
            >
              <option value="normal">Normalny</option>
              <option value="high">Wysoki</option>
            </select>
          </label>
        </div>

        {scenario?.status === "accepted" || scenario?.status === "ready_to_record" ? (
          <div className="notice">
            Edycja zaakceptowanego scenariusza utworzy nową wersję i odeśle go do recenzji.
          </div>
        ) : null}

        <div className="sheet-actions">
          <button type="submit" disabled={busy || !canSubmit}>
            Zapisz roboczo
          </button>
          <button
            type="button"
            className="primary-action"
            disabled={busy || !canSubmit}
            onClick={() => onSave(input, true)}
          >
            Wyślij do recenzji
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}

function BottomSheet({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const [drag, setDrag] = useState(0);
  const startY = useRef<number | null>(null);

  return (
    <>
      <div className="sheet-overlay" onClick={onClose} />
      <section className="bottom-sheet" style={{ transform: `translateY(${drag}px)` }}>
        <button
          className="sheet-handle"
          aria-label="Zamknij panel gestem"
          onTouchStart={(event) => {
            startY.current = event.touches[0].clientY;
          }}
          onTouchMove={(event) => {
            if (startY.current === null) return;
            setDrag(Math.max(0, event.touches[0].clientY - startY.current));
          }}
          onTouchEnd={() => {
            if (drag > 110) onClose();
            setDrag(0);
            startY.current = null;
          }}
        >
          <span />
        </button>
        <div className="sheet-title-row">
          <button onClick={onClose}>Wróć</button>
          <h2>{title}</h2>
        </div>
        <div className="sheet-scroll">{children}</div>
      </section>
    </>
  );
}

function activityLabel(activity: Pick<ScenarioActivity, "action" | "toStatus" | "note">) {
  if (activity.action === "scenario.comment_added") return "dodał komentarz";
  if (activity.action === "scenario.created_and_sent") return "wysłał scenariusz do recenzji";
  if (activity.action === "scenario.created") return "utworzył wersję roboczą";
  if (activity.action === "scenario.updated_and_sent") return "wysłał poprawioną wersję";
  if (activity.action === "scenario.archived") return "przeniósł scenariusz do archiwum";
  if (activity.toStatus === "accepted") return "zaakceptował scenariusz";
  if (activity.toStatus === "changes_requested") return "odesłał scenariusz do poprawek";
  if (activity.toStatus === "ready_to_record") return "oznaczył gotowość do nagrania";
  if (activity.toStatus === "recorded") return "oznaczył materiał jako nagrany";
  return activity.note || "zmienił scenariusz";
}
