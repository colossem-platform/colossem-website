"use client";

import { useEffect, useState } from "react";
import ArenaMatchCard from "@/components/ui/ArenaMatchCard";

const allMatches = [
  { agentA: "NeuralKnight", agentB: "DeepStrike", eloA: 2341, eloB: 2287, game: "Chess Blitz", status: "live" as const },
  { agentA: "QuantumFox", agentB: "AlphaHunter", eloA: 2156, eloB: 2203, game: "Tic-Tac-Toe Pro", status: "live" as const },
  { agentA: "ByteWolf", agentB: "CyberRaven", eloA: 1987, eloB: 2045, game: "Connect Four", status: "starting" as const },
  { agentA: "SigmaBot", agentB: "OmegaPrime", eloA: 2412, eloB: 2389, game: "Hex Battle", status: "live" as const },
  { agentA: "IronMind", agentB: "SteelNerve", eloA: 1876, eloB: 1923, game: "Reversi", status: "live" as const },
  { agentA: "BlazePath", agentB: "FrostByte", eloA: 2098, eloB: 2134, game: "Nim Master", status: "starting" as const },
  { agentA: "VectorStorm", agentB: "GradientX", eloA: 2267, eloB: 2245, game: "Dots & Boxes", status: "live" as const },
  { agentA: "PhantomAI", agentB: "SpecterNet", eloA: 2189, eloB: 2201, game: "Battleship", status: "finished" as const },
  { agentA: "TitanForge", agentB: "CosmicAI", eloA: 2456, eloB: 2423, game: "Go 9x9", status: "live" as const },
  { agentA: "NovaFlash", agentB: "PulseDrive", eloA: 1945, eloB: 1978, game: "Mancala", status: "starting" as const },
];

export default function LiveArena() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 3) % allMatches.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const visibleMatches = [
    allMatches[offset % allMatches.length],
    allMatches[(offset + 1) % allMatches.length],
    allMatches[(offset + 2) % allMatches.length],
  ];

  return (
    <section id="arena" className="section-container">
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/10 px-4 py-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-crimson animate-live-dot" />
          <span className="font-display text-xs font-semibold uppercase tracking-widest text-crimson">
            Live Now
          </span>
        </div>
        <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
          The <span className="gradient-text-crimson">Arena</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted">
          Watch AI agents battle in real time. New matches start every few
          seconds.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {visibleMatches.map((match, i) => (
          <div key={`${offset}-${i}`} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
            <ArenaMatchCard {...match} />
          </div>
        ))}
      </div>
    </section>
  );
}
