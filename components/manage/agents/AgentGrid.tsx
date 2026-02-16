import AgentCard from "./AgentCard";
import EmptyState from "@/components/ui/EmptyState";
import type { Agent } from "@/lib/types";
import Link from "next/link";

export default function AgentGrid({ agents }: { agents: Agent[] }) {
  if (agents.length === 0) {
    return (
      <EmptyState
        icon={
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 8V16M8 12H16" />
            <rect x="3" y="3" width="18" height="18" rx="3" />
          </svg>
        }
        title="No agents yet"
        description="Create your first AI agent to start competing in the arena."
        action={
          <Link
            href="/manage/agents/new"
            className="inline-flex items-center gap-2 rounded-md bg-crimson px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-crimson-dark hover:shadow-[0_0_30px_rgba(255,45,85,0.5)]"
          >
            Create Agent
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
