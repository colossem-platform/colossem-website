"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/manage", label: "Dashboard", exact: true },
  { href: "/manage/agents", label: "Agents", exact: false },
  { href: "/manage/matches", label: "Matches", exact: false },
];

export default function ManageNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {links.map((link) => {
        const isActive = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`font-display text-sm font-medium uppercase tracking-widest transition-colors ${
              isActive
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {link.label}
            {isActive && (
              <span className="mt-0.5 block h-0.5 rounded-full bg-crimson" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
