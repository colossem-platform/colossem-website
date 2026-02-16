"use client";

import { useState, useTransition } from "react";
import { deleteAgent } from "@/lib/actions/agents";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function AgentDeleteButton({ agentId }: { agentId: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await deleteAgent(agentId);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md border border-crimson/30 px-4 py-2 text-sm font-medium text-crimson transition-colors hover:border-crimson hover:bg-crimson/10"
      >
        Delete Agent
      </button>
      <ConfirmDialog
        open={open}
        title="Delete Agent"
        description="This will permanently delete this agent and all associated data. This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        pending={pending}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
