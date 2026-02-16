import Link from "next/link";
import { fetchAgent } from "@/lib/data/agents";
import { fetchMatches } from "@/lib/data/matches";
import { updateAgent } from "@/lib/actions/agents";
import StatusBadge from "@/components/ui/StatusBadge";
import TabNav from "@/components/ui/TabNav";
import AgentForm from "@/components/manage/agents/AgentForm";
import AgentStatusToggle from "@/components/manage/agents/AgentStatusToggle";
import AgentDeleteButton from "@/components/manage/agents/AgentDeleteButton";
import MatchCard from "@/components/manage/matches/MatchCard";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import NewMatchForm from "@/components/manage/matches/NewMatchForm";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "matches", label: "Matches" },
  { key: "settings", label: "Settings" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  try {
    const agent = await fetchAgent(agentId);
    return { title: `${agent.name} - Colossem` };
  } catch {
    return { title: "Agent - Colossem" };
  }
}

export default async function AgentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ agentId: string }>;
  searchParams: Promise<{ tab?: string; page?: string }>;
}) {
  const { agentId } = await params;
  const { tab = "overview", page = "1" } = await searchParams;

  const agent = await fetchAgent(agentId);

  // Bind the updateAgent action to this specific agent
  const boundUpdateAgent = updateAgent.bind(null, agentId);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link
          href="/manage/agents"
          className="transition-colors hover:text-foreground"
        >
          Agents
        </Link>
        <span>/</span>
        <span className="text-foreground">{agent.name}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-3xl font-bold text-foreground">
            {agent.name}
          </h1>
          <StatusBadge status={agent.status} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">
            {agent.status === "active" ? "Active" : "Inactive"}
          </span>
          <AgentStatusToggle agentId={agent.id} status={agent.status} />
        </div>
      </div>

      {/* Tabs */}
      <TabNav tabs={TABS} />

      {/* Tab content */}
      {tab === "overview" && <OverviewTab agent={agent} />}
      {tab === "matches" && (
        <MatchesTab agentId={agent.id} page={Number(page)} />
      )}
      {tab === "settings" && (
        <SettingsTab agent={agent} updateAction={boundUpdateAgent} />
      )}
    </div>
  );
}

// ── Overview Tab ──

function OverviewTab({ agent }: { agent: Awaited<ReturnType<typeof fetchAgent>> }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Info card */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted">
          Details
        </h2>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-muted">ID</dt>
            <dd className="font-mono text-foreground/60">{agent.id}</dd>
          </div>
          <div>
            <dt className="text-muted">Description</dt>
            <dd className="text-foreground">
              {agent.description || "No description"}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Game Types</dt>
            <dd className="flex flex-wrap gap-2 pt-1">
              {agent.gameTypes?.map((gt) => (
                <span
                  key={gt}
                  className="rounded-md border border-border-light bg-background px-2 py-0.5 text-xs font-medium text-muted"
                >
                  {gt}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Created</dt>
            <dd className="text-foreground">
              {new Date(agent.createdAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>

      {/* Ratings card */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted">
          Ratings
        </h2>
        {agent.ratings?.length ? (
          <div className="space-y-4">
            {agent.ratings.map((r) => (
              <div key={r.gameType}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">{r.gameType}</span>
                  <span className="font-display text-2xl font-bold text-gold">
                    {r.elo}
                  </span>
                </div>
                <div className="mt-1 flex gap-3 text-xs">
                  <span className="text-green-400">{r.wins} wins</span>
                  <span className="text-crimson">{r.losses} losses</span>
                  <span className="text-muted">{r.draws} draws</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No ratings yet. Play some matches!</p>
        )}
      </div>

      {/* Quick match */}
      <div className="rounded-xl border border-border bg-surface p-6 md:col-span-2">
        <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted">
          Quick Match
        </h2>
        <NewMatchForm agentId={agent.id} gameTypes={agent.gameTypes} />
      </div>
    </div>
  );
}

// ── Matches Tab ──

async function MatchesTab({
  agentId,
  page,
}: {
  agentId: string;
  page: number;
}) {
  const pageSize = 20;
  const { matches, count } = await fetchMatches({
    agentId,
    limit: pageSize,
    page,
  });

  if (matches.length === 0) {
    return (
      <EmptyState
        title="No matches yet"
        description="Queue a match from the Overview tab to get started."
      />
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
      <Pagination totalCount={count} pageSize={pageSize} />
    </div>
  );
}

// ── Settings Tab ──

function SettingsTab({
  agent,
  updateAction,
}: {
  agent: Awaited<ReturnType<typeof fetchAgent>>;
  updateAction: (
    prev: { error?: string; success?: boolean } | undefined,
    formData: FormData
  ) => Promise<{ error?: string; success?: boolean }>;
}) {
  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-4 font-display text-lg font-bold text-foreground">
          Edit Agent
        </h2>
        <AgentForm agent={agent} action={updateAction} />
      </div>

      <div className="mx-auto max-w-xl border-t border-border pt-8">
        <h2 className="mb-2 font-display text-lg font-bold text-crimson">
          Danger Zone
        </h2>
        <p className="mb-4 text-sm text-muted">
          Permanently delete this agent. This cannot be undone.
        </p>
        <AgentDeleteButton agentId={agent.id} />
      </div>
    </div>
  );
}
