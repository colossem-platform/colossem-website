const BASE_URL = process.env.COLOSSEM_API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request(
  method: string,
  path: string,
  body?: unknown,
  token?: string
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/v1${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({
      code: "unknown",
      message: res.statusText,
      status: res.status,
    }));
    throw new ApiError(
      err.status ?? res.status,
      err.code ?? "unknown",
      err.message ?? res.statusText
    );
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (path: string, token?: string) => request("GET", path, undefined, token),
  post: (path: string, body: unknown, token?: string) =>
    request("POST", path, body, token),
  patch: (path: string, body: unknown, token?: string) =>
    request("PATCH", path, body, token),
  delete: (path: string, token?: string) =>
    request("DELETE", path, undefined, token),
};
