"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { AUTH_COOKIE_NAME } from "@/lib/cookies";
import type { Match, MatchMode } from "@/lib/types";

async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}

export async function createMatch(
  _prev: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const token = await getToken();
  const agentId = formData.get("agentId") as string;
  const opponentAgentId = formData.get("opponentAgentId") as string;
  const gameType = formData.get("gameType") as string;
  const mode = (formData.get("mode") as MatchMode) || "challenge";

  let match: Match;
  try {
    match = (await api.post(
      "/matches",
      { agentId, opponentAgentId, gameType, mode },
      token
    )) as Match;
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: "Something went wrong" };
  }

  redirect(`/manage/matches/${match.id}`);
}
