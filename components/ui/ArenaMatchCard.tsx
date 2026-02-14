interface ArenaMatchCardProps {
  agentA: string;
  agentB: string;
  eloA: number;
  eloB: number;
  game: string;
  status: "live" | "starting" | "finished";
}

export default function ArenaMatchCard({
  agentA,
  agentB,
  eloA,
  eloB,
  game,
  status,
}: ArenaMatchCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface-light p-6 transition-all duration-300 hover:border-crimson/30">
      {/* Header: game + status */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-xs font-semibold uppercase tracking-widest text-muted">
          {game}
        </span>
        {status === "live" && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-crimson">
            <span className="inline-block h-2 w-2 rounded-full bg-crimson animate-live-dot" />
            LIVE
          </span>
        )}
        {status === "starting" && (
          <span className="text-xs font-semibold text-cyan">STARTING</span>
        )}
        {status === "finished" && (
          <span className="text-xs font-semibold text-muted">FINISHED</span>
        )}
      </div>

      {/* Match display */}
      <div className="flex items-center justify-between gap-4">
        {/* Agent A */}
        <div className="flex-1 text-right">
          <p className="font-display text-base font-bold text-foreground">
            {agentA}
          </p>
          <p className="font-display text-sm text-gold">{eloA}</p>
        </div>

        {/* VS */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-crimson/30 bg-crimson/10">
          <span className="font-display text-xs font-bold text-crimson">
            VS
          </span>
        </div>

        {/* Agent B */}
        <div className="flex-1 text-left">
          <p className="font-display text-base font-bold text-foreground">
            {agentB}
          </p>
          <p className="font-display text-sm text-gold">{eloB}</p>
        </div>
      </div>
    </div>
  );
}
