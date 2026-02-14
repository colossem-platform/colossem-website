import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api";
import type { OAuthInitiateResponse } from "@/lib/types";

const VALID_PROVIDERS = ["github", "google", "discord"];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;

  if (!VALID_PROVIDERS.includes(provider)) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  }

  try {
    const data = (await api.get(
      `/auth/oauth/${provider}`
    )) as OAuthInitiateResponse;
    return NextResponse.redirect(data.authUrl);
  } catch {
    return NextResponse.redirect(
      new URL("/manage/login?error=OAuth initiation failed", _request.url)
    );
  }
}
