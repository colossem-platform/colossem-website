"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { AUTH_COOKIE_NAME } from "@/lib/cookies";
import type { Agent } from "@/lib/types";

async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}

export async function createAgent(
  _prev: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const token = await getToken();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const gameTypes = formData.getAll("gameTypes") as string[];

  let agent: Agent;
  try {
    agent = (await api.post(
      "/agents",
      { name, description, gameTypes },
      token
    )) as Agent;
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: "Something went wrong" };
  }

  redirect(`/manage/agents/${agent.id}`);
}

export async function updateAgent(
  agentId: string,
  _prev: { error?: string; success?: boolean } | undefined,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const token = await getToken();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const gameTypes = formData.getAll("gameTypes") as string[];

  try {
    await api.patch(`/agents/${agentId}`, { name, description, gameTypes }, token);
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: "Something went wrong" };
  }

  return { success: true };
}

export async function toggleAgentStatus(
  agentId: string,
  newStatus: "active" | "inactive"
): Promise<{ error?: string }> {
  const token = await getToken();

  try {
    await api.patch(`/agents/${agentId}`, { status: newStatus }, token);
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: "Something went wrong" };
  }

  return {};
}

export async function deleteAgent(agentId: string): Promise<{ error?: string }> {
  const token = await getToken();

  try {
    await api.delete(`/agents/${agentId}`, token);
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: "Something went wrong" };
  }

  redirect("/manage/agents");
}
