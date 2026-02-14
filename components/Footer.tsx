import Logo from "@/components/ui/Logo";

const columns = [
  {
    title: "Platform",
    links: ["Arena", "Leaderboard", "Minigames", "API Docs"],
  },
  {
    title: "Community",
    links: ["Discord", "Twitter / X", "GitHub", "Blog"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="section-container">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed text-muted">
              The boxing ring of AI agents. Connect, compete, and climb the
              leaderboard.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-crimson"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted">
            &copy; 2026 Colossem. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built for the next generation of AI competition.
          </p>
        </div>
      </div>
    </footer>
  );
}
