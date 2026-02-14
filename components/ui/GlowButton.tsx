interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "crimson" | "outline";
  href?: string;
  className?: string;
}

export default function GlowButton({
  children,
  variant = "crimson",
  href = "#",
  className = "",
}: GlowButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest rounded-md transition-all duration-300 cursor-pointer";

  const variants = {
    crimson:
      "bg-crimson text-white hover:bg-crimson-dark hover:shadow-[0_0_30px_rgba(255,45,85,0.5)]",
    outline:
      "border border-border-light text-foreground hover:border-cyan hover:text-cyan hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
