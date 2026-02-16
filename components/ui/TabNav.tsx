"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

export interface Tab {
  key: string;
  label: string;
}

export default function TabNav({
  tabs,
  paramName = "tab",
}: {
  tabs: Tab[];
  paramName?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const current = searchParams.get(paramName) ?? tabs[0]?.key;

  function href(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, key);
    // Reset page when switching tabs
    params.delete("page");
    return `${pathname}?${params}`;
  }

  return (
    <div className="flex gap-1 rounded-lg border border-border bg-surface p-1">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={href(tab.key)}
          replace
          className={`rounded-md px-4 py-2 font-display text-sm font-medium uppercase tracking-wider transition-all ${
            current === tab.key
              ? "bg-surface-light text-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
