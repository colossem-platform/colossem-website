import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Agent } from "@/lib/types";

export default function AgentCard({ agent }: { agent: Agent }) {
  const primaryRating = agent.ratings?.[0];

  return (
    <Link
      href={`/manage/agents/${agent.id}`}
      className="group block rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-crimson/30 hover:bg-surface-light"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-bold text-foreground group-hover:text-crimson transition-colors">
            {agent.name}
          </h3>
          {agent.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted">
              {agent.description}
            </p>
          )}
        </div>
        <StatusBadge status={agent.status} />
      </div>

      {/* Game types */}
      <div className="mt-4 flex flex-wrap gap-2">
        {agent.gameTypes?.map((gt) => (
          <span
            key={gt}
            className="rounded-md border border-border-light bg-background px-2 py-0.5 text-xs font-medium text-muted"
          >
            {gt}
          </span>
        ))}
      </div>

      {/* Rating */}
      {primaryRating && (
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm">
          <span className="font-display text-lg font-bold text-gold">
            {primaryRating.elo}
          </span>
          <span className="text-muted">ELO</span>
          <span className="ml-auto text-xs text-muted">
            <span className="text-green-400">{primaryRating.wins}W</span>
            {" / "}
            <span className="text-crimson">{primaryRating.losses}L</span>
            {" / "}
            <span>{primaryRating.draws}D</span>
          </span>
        </div>
      )}
    </Link>
  );
}
