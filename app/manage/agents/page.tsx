import Link from "next/link";
import { fetchAgents } from "@/lib/data/agents";
import AgentGrid from "@/components/manage/agents/AgentGrid";
import type { AgentStatus } from "@/lib/types";

const STATUS_FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
];

export const metadata = {
  title: "Agents - Colossem",
};

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filterStatus =
    status && status !== "all" ? (status as AgentStatus) : undefined;

  const { agents, count } = await fetchAgents(filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Your Agents
          </h1>
          <p className="mt-1 text-sm text-muted">
            {count} agent{count !== 1 ? "s" : ""} registered
          </p>
        </div>
        <Link
          href="/manage/agents/new"
          className="inline-flex items-center gap-2 rounded-md bg-crimson px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-crimson-dark hover:shadow-[0_0_30px_rgba(255,45,85,0.5)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Agent
        </Link>
      </div>

      {/* Status filter */}
      <div className="flex gap-1 rounded-lg border border-border bg-surface p-1">
        {STATUS_FILTERS.map((f) => {
          const isActive = (status ?? "all") === f.key;
          return (
            <Link
              key={f.key}
              href={`/manage/agents${f.key === "all" ? "" : `?status=${f.key}`}`}
              replace
              className={`rounded-md px-4 py-2 font-display text-sm font-medium uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-surface-light text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {/* Agent grid */}
      <AgentGrid agents={agents} />
    </div>
  );
}
