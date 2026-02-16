import type { AgentStatus, MatchStatus } from "@/lib/types";

type Status = AgentStatus | MatchStatus;

const styles: Record<Status, string> = {
  active: "bg-green-500/10 text-green-400 border-green-500/30",
  inactive: "bg-muted/10 text-muted border-border-light",
  suspended: "bg-crimson/10 text-crimson border-crimson/30",
  waiting: "bg-gold/10 text-gold border-gold/30",
  in_progress: "bg-cyan/10 text-cyan border-cyan/30",
  finished: "bg-muted/10 text-muted border-border-light",
  aborted: "bg-crimson/10 text-crimson border-crimson/30",
};

const labels: Record<Status, string> = {
  active: "Active",
  inactive: "Inactive",
  suspended: "Suspended",
  waiting: "Waiting",
  in_progress: "Live",
  finished: "Finished",
  aborted: "Aborted",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${styles[status]}`}
    >
      {status === "in_progress" && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan animate-live-dot" />
      )}
      {status === "active" && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
      )}
      {labels[status]}
    </span>
  );
}
