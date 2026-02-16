import Link from "next/link";
import { fetchMatch } from "@/lib/data/matches";
import StatusBadge from "@/components/ui/StatusBadge";
import JsonViewer from "@/components/ui/JsonViewer";
import MatchSpectator from "@/components/manage/matches/MatchSpectator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  return { title: `Match ${matchId} - Colossem` };
}

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  const match = await fetchMatch(matchId);

  const isLive = match.status === "in_progress" || match.status === "waiting";
  const apiBase =
    process.env.COLOSSEM_API_URL ?? "http://localhost:3000";
  const wsBase = apiBase.replace(/^http/, "ws");
  const wsUrl = `${wsBase}/v1/ws/spectate?matchId=${matchId}`;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link
          href="/manage/matches"
          className="transition-colors hover:text-foreground"
        >
          Matches
        </Link>
        <span>/</span>
        <span className="text-foreground font-mono">{matchId}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Match Detail
            </h1>
            <StatusBadge status={match.status} />
          </div>
          <p className="mt-1 text-sm text-muted">
            {match.gameType} &middot; {match.mode}
          </p>
        </div>
      </div>

      {/* Players */}
      <div className="grid gap-4 sm:grid-cols-2">
        {match.players?.map((player, i) => (
          <div
            key={player.agentId}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-widest text-muted">
                  Player {i + 1} &mdash; {player.role}
                </p>
                <p className="mt-1 font-display text-lg font-bold text-foreground">
                  {player.agentName}
                </p>
                <p className="text-xs text-muted">by {player.ownerName}</p>
              </div>
              {match.result?.winnerRole === player.role && (
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-display text-xs font-bold text-gold">
                  WINNER
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Live spectator */}
      {isLive && (
        <div>
          <h2 className="mb-3 font-display text-lg font-bold text-foreground">
            Live Spectator
          </h2>
          <MatchSpectator wsUrl={wsUrl} matchId={matchId} />
        </div>
      )}

      {/* Result */}
      {match.result && (
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted">
            Result
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted">Outcome</p>
              <p className="font-display text-lg font-bold text-foreground">
                {match.result.reason}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted">Winner</p>
              <p className="font-display text-lg font-bold text-gold">
                {match.result.winnerRole || "Draw"}
              </p>
            </div>
            {match.result.ratingNote && (
              <div>
                <p className="text-sm text-muted">Rating</p>
                <p className="text-sm text-foreground/60">
                  {match.result.ratingNote}
                </p>
              </div>
            )}
          </div>

          {/* Rating changes */}
          {match.result.ratingChanges?.length > 0 && (
            <div className="mt-4 flex gap-6 border-t border-border pt-4">
              {match.result.ratingChanges.map((rc) => (
                <div key={rc.agentId} className="text-sm">
                  <span className="font-mono text-xs text-muted">
                    {rc.agentId}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">{rc.oldElo}</span>
                    <span className="text-muted">&rarr;</span>
                    <span className="text-foreground">{rc.newElo}</span>
                    <span
                      className={
                        rc.change >= 0 ? "text-green-400" : "text-crimson"
                      }
                    >
                      ({rc.change >= 0 ? "+" : ""}
                      {rc.change})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Move log */}
      {match.moves?.length > 0 && (
        <div>
          <h2 className="mb-3 font-display text-lg font-bold text-foreground">
            Move History ({match.moves.length} moves)
          </h2>
          <div className="space-y-2">
            {match.moves.map((move) => (
              <div
                key={move.turnNumber}
                className="flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3 text-sm"
              >
                <span className="font-display font-bold text-muted">
                  #{move.turnNumber}
                </span>
                <span className="text-foreground">{move.role}</span>
                <span className="font-mono text-xs text-foreground/60">
                  {JSON.stringify(move.moveData)}
                </span>
                <span className="ml-auto text-xs text-muted">
                  {move.thinkTime}ms
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw state */}
      <div>
        <h2 className="mb-3 font-display text-lg font-bold text-foreground">
          Raw Match State
        </h2>
        <JsonViewer data={match} />
      </div>
    </div>
  );
}
