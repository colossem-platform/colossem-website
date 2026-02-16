import { cookies } from "next/headers";
import { api } from "@/lib/api";
import { AUTH_COOKIE_NAME } from "@/lib/cookies";
import type { Agent, ListAgentsResponse, AgentStatus } from "@/lib/types";

async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}

export async function fetchAgents(
  status?: AgentStatus
): Promise<ListAgentsResponse> {
  const token = await getToken();
  const query = status ? `?status=${status}` : "";
  return (await api.get(`/agents${query}`, token)) as ListAgentsResponse;
}

export async function fetchAgent(agentId: string): Promise<Agent> {
  const token = await getToken();
  return (await api.get(`/agents/${agentId}`, token)) as Agent;
}
