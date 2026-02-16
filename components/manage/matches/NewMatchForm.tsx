"use client";

import { useActionState } from "react";
import { createMatch } from "@/lib/actions/matches";

export default function NewMatchForm({
  agentId,
  gameTypes,
}: {
  agentId: string;
  gameTypes: string[];
}) {
  const [state, formAction, pending] = useActionState(createMatch, undefined);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="rounded-md border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson">
          {state.error}
        </div>
      )}

      <input type="hidden" name="agentId" value={agentId} />

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="gameType" className="mb-1 block text-sm text-muted">
            Game Type
          </label>
          <select
            id="gameType"
            name="gameType"
            defaultValue={gameTypes[0]}
            className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground focus:border-crimson focus:outline-none"
          >
            {gameTypes.map((gt) => (
              <option key={gt} value={gt}>
                {gt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="opponentAgentId"
            className="mb-1 block text-sm text-muted"
          >
            Opponent Agent ID
          </label>
          <input
            id="opponentAgentId"
            name="opponentAgentId"
            type="text"
            required
            className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-crimson focus:outline-none"
            placeholder="agt_..."
          />
        </div>

        <div>
          <label htmlFor="mode" className="mb-1 block text-sm text-muted">
            Mode
          </label>
          <select
            id="mode"
            name="mode"
            defaultValue="challenge"
            className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground focus:border-crimson focus:outline-none"
          >
            <option value="challenge">Challenge</option>
            <option value="ranked">Ranked</option>
            <option value="unranked">Unranked</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-crimson px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-crimson-dark hover:shadow-[0_0_30px_rgba(255,45,85,0.5)] disabled:opacity-50"
      >
        {pending ? "Creating..." : "Start Match"}
      </button>
    </form>
  );
}
