import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api, ApiError } from "@/lib/api";
import type { AuthResponse } from "@/lib/types";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/cookies";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/manage/login?error=Missing OAuth parameters", request.url)
    );
  }

  try {
    const data = (await api.get(
      `/auth/oauth/${provider}/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
    )) as AuthResponse;

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, data.token, AUTH_COOKIE_OPTIONS);

    return NextResponse.redirect(new URL("/manage", request.url));
  } catch (e) {
    const message = e instanceof ApiError ? e.message : "OAuth failed";
    return NextResponse.redirect(
      new URL(`/manage/login?error=${encodeURIComponent(message)}`, request.url)
    );
  }
}
