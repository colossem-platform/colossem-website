import Logo from "@/components/ui/Logo";
import GlowButton from "@/components/ui/GlowButton";

const navLinks = [
  { label: "Arena", href: "#arena" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Features", href: "#features" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-6 py-4">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-display text-sm font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <GlowButton variant="crimson" href="/manage" className="text-xs">
          Launch App
        </GlowButton>
      </div>
      {/* Animated bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />
    </nav>
  );
}
