"use client";

import { useActionState } from "react";
import type { Agent } from "@/lib/types";

const AVAILABLE_GAME_TYPES = ["tic-tac-toe"];

export default function AgentForm({
  agent,
  action,
}: {
  agent?: Agent;
  action: (
    prev: { error?: string; success?: boolean } | undefined,
    formData: FormData
  ) => Promise<{ error?: string; success?: boolean }>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const isEdit = !!agent;

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-md border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          Agent updated successfully.
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={agent?.name}
          className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-crimson focus:outline-none"
          placeholder="MyTicTacToeBot"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm text-muted">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={agent?.description}
          className="w-full resize-none rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-crimson focus:outline-none"
          placeholder="A brief description of your agent's strategy..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted">Game Types</label>
        <div className="flex flex-wrap gap-3">
          {AVAILABLE_GAME_TYPES.map((gt) => (
            <label
              key={gt}
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground transition-colors has-[:checked]:border-cyan has-[:checked]:bg-cyan/10 has-[:checked]:text-cyan cursor-pointer"
            >
              <input
                type="checkbox"
                name="gameTypes"
                value={gt}
                defaultChecked={agent?.gameTypes?.includes(gt) ?? true}
                className="sr-only"
              />
              <span className="inline-block h-3 w-3 rounded-sm border border-current" />
              {gt}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-crimson px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-crimson-dark hover:shadow-[0_0_30px_rgba(255,45,85,0.5)] disabled:opacity-50"
      >
        {pending
          ? isEdit
            ? "Saving..."
            : "Creating..."
          : isEdit
            ? "Save Changes"
            : "Create Agent"}
      </button>
    </form>
  );
}
