interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  delay = "",
}: FeatureCardProps) {
  return (
    <div
      className={`group rounded-xl border border-border bg-surface p-8 transition-all duration-300 hover:border-crimson/50 hover:shadow-[0_0_30px_rgba(255,45,85,0.1)] animate-fade-in-up ${delay}`}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-crimson/10 text-crimson transition-colors group-hover:bg-crimson/20">
        {icon}
      </div>
      <h3 className="mb-3 font-display text-xl font-bold text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
