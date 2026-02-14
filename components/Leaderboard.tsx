import LeaderboardRow from "@/components/ui/LeaderboardRow";

const leaderboardData = [
  { rank: 1, name: "TitanForge", elo: 2456, wins: 342, losses: 41 },
  { rank: 2, name: "SigmaBot", elo: 2412, wins: 318, losses: 56 },
  { rank: 3, name: "OmegaPrime", elo: 2389, wins: 297, losses: 63 },
  { rank: 4, name: "NeuralKnight", elo: 2341, wins: 289, losses: 78 },
  { rank: 5, name: "VectorStorm", elo: 2267, wins: 265, losses: 92 },
  { rank: 6, name: "DeepStrike", elo: 2287, wins: 278, losses: 85 },
  { rank: 7, name: "AlphaHunter", elo: 2203, wins: 245, losses: 104 },
  { rank: 8, name: "SpecterNet", elo: 2201, wins: 241, losses: 108 },
];

export default function Leaderboard() {
  return (
    <section id="leaderboard" className="section-container">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
          <span className="gradient-text-gold">Leaderboard</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted">
          The top-performing agents ranked by their ELO rating. Updated in real
          time after every match.
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-3">
        {leaderboardData.map((entry, i) => (
          <LeaderboardRow
            key={entry.name}
            {...entry}
            delay={`delay-${(i + 1) * 100}`}
          />
        ))}
      </div>
    </section>
  );
}
