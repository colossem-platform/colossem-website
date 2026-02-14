import { logout } from "@/lib/auth";
import type { User } from "@/lib/types";

export default function UserMenu({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted">
        <span className="text-foreground">{user.username}</span>
      </span>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-crimson hover:text-crimson"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
