export default function ManageNav() {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      <a
        href="/manage"
        className="font-display text-sm font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground"
      >
        Dashboard
      </a>
    </nav>
  );
}
