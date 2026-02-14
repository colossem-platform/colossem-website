"use client";

import { useActionState, useState } from "react";
import { register } from "@/lib/auth";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, {
    error: undefined,
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <div className="space-y-4">
      {/* Error display */}
      {state?.error && (
        <div className="rounded-md border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson">
          {state.error}
        </div>
      )}

      {/* OAuth and Password toggle buttons */}
      <div className="space-y-3">
        <a
          href="/api/auth/google"
          className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-border-light hover:bg-surface-light"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
              fill="#4285F4"
            />
            <path
              d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
              fill="#34A853"
            />
            <path
              d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              fill="#FBBC05"
            />
            <path
              d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </a>

        <button
          type="button"
          disabled
          className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-surface px-4 py-3 text-sm font-medium text-muted opacity-50 cursor-not-allowed"
          title="Coming soon"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M9 0C4.0275 0 0 4.13211 0 9.22838C0 13.3065 2.5785 16.7648 6.15375 17.9841C6.60375 18.0709 6.76875 17.7853 6.76875 17.5403C6.76875 17.3212 6.76125 16.7405 6.7575 15.9712C4.254 16.5277 3.726 14.7332 3.726 14.7332C3.3165 13.6681 2.72475 13.3832 2.72475 13.3832C1.9095 12.8111 2.78775 12.8229 2.78775 12.8229C3.6915 12.8871 4.16625 13.7737 4.16625 13.7737C4.96875 15.1847 6.273 14.777 6.7875 14.5414C6.8685 13.9443 7.10025 13.5381 7.3575 13.3065C5.35875 13.0748 3.258 12.2973 3.258 8.75524C3.258 7.74618 3.60825 6.92421 4.18425 6.27812C4.083 6.04343 3.77925 5.10222 4.263 3.82254C4.263 3.82254 5.01675 3.57462 6.738 4.76538C7.458 4.56073 8.223 4.45878 8.988 4.45429C9.753 4.45878 10.518 4.56073 11.238 4.76538C12.948 3.57462 13.7017 3.82254 13.7017 3.82254C14.1855 5.10222 13.8818 6.04343 13.7917 6.27812C14.3655 6.92421 14.7142 7.74618 14.7142 8.75524C14.7142 12.3051 12.6105 13.0725 10.608 13.3012C10.923 13.5882 11.2155 14.1471 11.2155 15.0053C11.2155 16.2425 11.2043 17.2413 11.2043 17.5403C11.2043 17.7877 11.3625 18.0755 11.8237 17.9841C15.4215 16.7609 18 13.3041 18 9.22838C18 4.13211 13.9703 0 9 0Z" />
          </svg>
          Continue with GitHub
        </button>

        <button
          type="button"
          disabled
          className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-surface px-4 py-3 text-sm font-medium text-muted opacity-50 cursor-not-allowed"
          title="Coming soon"
        >
          <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="#5865F2">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
          </svg>
          Continue with Discord
        </button>

        <button
          type="button"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-border-light hover:bg-surface-light"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Sign in with Password
        </button>
      </div>

      {/* Password form (hidden by default) */}
      {showPasswordForm && (
        <form action={formAction} className="space-y-4 pt-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm text-muted"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-crimson focus:outline-none"
              placeholder="alice"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-crimson focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-muted"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-crimson focus:outline-none"
              placeholder="min 8 characters"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-crimson px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-crimson-dark hover:shadow-[0_0_30px_rgba(255,45,85,0.5)] disabled:opacity-50"
          >
            {pending ? "Creating account..." : "Create Account"}
          </button>
        </form>
      )}
    </div>
  );
}
