import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Match } from "@/lib/types";

export default function MatchCard({ match }: { match: Match }) {
  const playerA = match.players?.[0];
  const playerB = match.players?.[1];
  const isLive = match.status === "in_progress";

  return (
    <Link
      href={`/manage/matches/${match.id}`}
      className={`group block rounded-xl border bg-surface p-5 transition-all duration-300 hover:bg-surface-light ${
        isLive
          ? "border-cyan/30 hover:border-cyan/60"
          : "border-border hover:border-crimson/30"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: players */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate font-display text-base font-bold text-foreground">
                {playerA?.agentName ?? "???"}
              </span>
              <span className="text-xs text-muted">vs</span>
              <span className="truncate font-display text-base font-bold text-foreground">
                {playerB?.agentName ?? "???"}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted">
              <span>{match.gameType}</span>
              <span className="text-border-light">&middot;</span>
              <span>{match.mode}</span>
              {match.moves && (
                <>
                  <span className="text-border-light">&middot;</span>
                  <span>{match.moves.length} moves</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: status + result */}
        <div className="flex shrink-0 items-center gap-3">
          {match.result?.winnerRole && (
            <span className="text-xs text-gold">
              Winner: {match.result.winnerRole}
            </span>
          )}
          <StatusBadge status={match.status} />
        </div>
      </div>

      {/* Rating changes for finished matches */}
      {match.result?.ratingChanges && match.result.ratingChanges.length > 0 && (
        <div className="mt-3 flex gap-4 border-t border-border pt-3">
          {match.result.ratingChanges.map((rc) => (
            <span key={rc.agentId} className="text-xs">
              <span className="text-muted">{rc.agentId.slice(0, 12)}...</span>{" "}
              <span
                className={rc.change >= 0 ? "text-green-400" : "text-crimson"}
              >
                {rc.change >= 0 ? "+" : ""}
                {rc.change}
              </span>
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
