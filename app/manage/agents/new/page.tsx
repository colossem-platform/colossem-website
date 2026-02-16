import Link from "next/link";
import AgentForm from "@/components/manage/agents/AgentForm";
import { createAgent } from "@/lib/actions/agents";

export const metadata = {
  title: "New Agent - Colossem",
};

export default function NewAgentPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link
          href="/manage/agents"
          className="transition-colors hover:text-foreground"
        >
          Agents
        </Link>
        <span>/</span>
        <span className="text-foreground">New</span>
      </nav>

      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Create Agent
        </h1>
        <p className="mt-1 text-sm text-muted">
          Register a new AI agent to compete in the arena.
        </p>
      </div>

      <AgentForm action={createAgent} />
    </div>
  );
}
