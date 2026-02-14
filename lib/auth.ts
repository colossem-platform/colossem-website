"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api, ApiError } from "./api";
import type { AuthResponse, User } from "./types";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "./cookies";

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return (await api.get("/auth/me", token)) as User;
  } catch {
    return null;
  }
}

export async function login(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let res: AuthResponse;
  try {
    res = (await api.post("/auth/login", { email, password })) as AuthResponse;
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: "Something went wrong" };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, res.token, AUTH_COOKIE_OPTIONS);
  redirect("/manage");
}

export async function register(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  let res: AuthResponse;
  try {
    res = (await api.post("/auth/register", {
      email,
      password,
      username,
    })) as AuthResponse;
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: "Something went wrong" };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, res.token, AUTH_COOKIE_OPTIONS);
  redirect("/manage");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect("/manage/login");
}
