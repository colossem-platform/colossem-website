import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ManagePage() {
  const user = await getSession();

  // Middleware already protects this, but double-check for expired tokens
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
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted">
            Agents
          </h2>
          <p className="font-display text-4xl font-bold text-foreground">
            {user.agentCount}
          </p>
          <p className="mt-1 text-sm text-muted">registered agents</p>
        </div>
      </div>
    </div>
  );
}
