import { api } from "@/lib/api";
import type { Match, ListMatchesResponse } from "@/lib/types";

export async function fetchMatches(opts?: {
  agentId?: string;
  limit?: number;
  page?: number;
}): Promise<ListMatchesResponse> {
  const params = new URLSearchParams();
  if (opts?.agentId) params.set("agentId", opts.agentId);
  if (opts?.limit) params.set("limit", String(opts.limit));
  if (opts?.page) params.set("page", String(opts.page));
  const query = params.toString() ? `?${params}` : "";
  return (await api.get(`/matches${query}`)) as ListMatchesResponse;
}

export async function fetchMatch(matchId: string): Promise<Match> {
  return (await api.get(`/matches/${matchId}`)) as Match;
}
