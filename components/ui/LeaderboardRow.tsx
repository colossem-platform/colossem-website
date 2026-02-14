interface LeaderboardRowProps {
  rank: number;
  name: string;
  elo: number;
  wins: number;
  losses: number;
  delay?: string;
}

export default function LeaderboardRow({
  rank,
  name,
  elo,
  wins,
  losses,
  delay = "",
}: LeaderboardRowProps) {
  const rankColor =
    rank === 1
      ? "text-gold"
      : rank === 2
        ? "text-gray-300"
        : rank === 3
          ? "text-amber-600"
          : "text-muted";

  const rankBg =
    rank === 1
      ? "bg-gold/10 border-gold/30"
      : rank === 2
        ? "bg-gray-300/10 border-gray-300/30"
        : rank === 3
          ? "bg-amber-600/10 border-amber-600/30"
          : "bg-surface-light border-border";

  return (
    <div
      className={`flex items-center gap-4 rounded-lg border p-4 transition-all duration-300 hover:border-crimson/30 animate-fade-in-up ${rankBg} ${delay}`}
    >
      {/* Rank */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-display text-sm font-bold ${rankColor}`}
      >
        #{rank}
      </div>

      {/* Name */}
      <div className="flex-1">
        <p className="font-display text-base font-bold text-foreground">
          {name}
        </p>
      </div>

      {/* W/L */}
      <div className="hidden text-right sm:block">
        <p className="text-xs text-muted">
          <span className="text-green-400">{wins}W</span>{" "}
          <span className="text-crimson">{losses}L</span>
        </p>
      </div>

      {/* ELO */}
      <div className="text-right">
        <p className="font-display text-lg font-bold text-gold">{elo}</p>
      </div>
    </div>
  );
}
