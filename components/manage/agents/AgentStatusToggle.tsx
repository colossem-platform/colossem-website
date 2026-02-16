"use client";

import { useTransition } from "react";
import { toggleAgentStatus } from "@/lib/actions/agents";
import { useRouter } from "next/navigation";
import type { AgentStatus } from "@/lib/types";

export default function AgentStatusToggle({
  agentId,
  status,
}: {
  agentId: string;
  status: AgentStatus;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const isActive = status === "active";

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleAgentStatus(
        agentId,
        isActive ? "inactive" : "active"
      );
      if (!result.error) router.refresh();
    });
  }

  if (status === "suspended") {
    return (
      <span className="text-xs text-crimson">
        Agent is suspended by platform
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={pending}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
        isActive ? "bg-green-500" : "bg-border-light"
      }`}
      role="switch"
      aria-checked={isActive}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          isActive ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
