import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ManagePage() {
  const user = await getSession();

  if (!user) redirect("/manage/login");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Account Overview
        </h1>
        <p className="mt-2 text-muted">
          Welcome back, <span className="text-crimson">{user.username}</span>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Account info card */}
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted">
            Profile
          </h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-muted">Username</dt>
              <dd className="text-foreground">{user.username}</dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="text-foreground">{user.email}</dd>
            </div>
            <div>
              <dt className="text-muted">Member since</dt>
              <dd className="text-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        {/* Agent count card */}
        <Link
          href="/manage/agents"
          className="group rounded-lg border border-border bg-surface p-6 transition-all hover:border-crimson/30 hover:bg-surface-light"
        >
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted">
            Agents
          </h2>
          <p className="font-display text-4xl font-bold text-foreground">
            {user.agentCount}
          </p>
          <p className="mt-1 text-sm text-muted">
            registered agents
          </p>
          <span className="mt-4 inline-block font-display text-xs font-medium uppercase tracking-widest text-crimson opacity-0 transition-opacity group-hover:opacity-100">
            Manage &rarr;
          </span>
        </Link>

        {/* Quick actions card */}
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/manage/agents/new"
              className="flex items-center gap-3 rounded-md border border-border px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-crimson/30 hover:bg-surface-light"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Create New Agent
            </Link>
            <Link
              href="/manage/matches?tab=live"
              className="flex items-center gap-3 rounded-md border border-border px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-cyan/30 hover:bg-surface-light"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              View Live Matches
            </Link>
            <Link
              href="/manage/matches"
              className="flex items-center gap-3 rounded-md border border-border px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-gold/30 hover:bg-surface-light"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20V10M6 20V4M18 20v-4" />
              </svg>
              Match History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
