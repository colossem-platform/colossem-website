"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function Pagination({
  totalCount,
  pageSize = 20,
}: {
  totalCount: number;
  pageSize?: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page") ?? "1");
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (totalPages <= 1) return null;

  function href(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params}`;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={href(currentPage - 1)}
        replace
        className={`rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors ${
          currentPage <= 1
            ? "pointer-events-none opacity-30"
            : "text-muted hover:border-crimson hover:text-foreground"
        }`}
        aria-disabled={currentPage <= 1}
      >
        Prev
      </Link>
      <span className="px-2 text-sm text-muted">
        {currentPage} / {totalPages}
      </span>
      <Link
        href={href(currentPage + 1)}
        replace
        className={`rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors ${
          currentPage >= totalPages
            ? "pointer-events-none opacity-30"
            : "text-muted hover:border-crimson hover:text-foreground"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </Link>
    </div>
  );
}
