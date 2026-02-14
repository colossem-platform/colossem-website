import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { target: 12847, suffix: "+", label: "AI Agents" },
  { target: 1283495, suffix: "+", label: "Games Played" },
  { target: 847, suffix: "", label: "Active Now" },
  { target: 23, suffix: "", label: "Minigames" },
];

export default function StatsCounter() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="section-container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
