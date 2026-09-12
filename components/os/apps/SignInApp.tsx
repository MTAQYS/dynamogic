"use client";

import { useState } from "react";

/**
 * Demo-only Sign in — clearly badged. No passwords stored; no "account created."
 */
export function SignInApp() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex h-full flex-col overflow-auto bg-bg app-pad">
      <div className="inline-flex w-fit items-center rounded-full border border-border bg-bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
        Demo — not connected
      </div>
      <p className="mt-4 app-kicker">Account</p>
      <h2 className="app-title">Sign in</h2>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-fg-muted">
        Real magic-link signup needs Supabase. This window is UI only — nothing
        is sent or stored.
      </p>

      <label htmlFor="signin-email" className="mt-6 text-[11px] font-semibold tracking-tight text-fg">
        Email
      </label>
      <input
        id="signin-email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-bg-paper px-3 text-[14px] shadow-soft"
      />

      <button
        type="button"
        disabled
        className="btn-soft mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl text-[13px] font-semibold tracking-tight disabled:cursor-not-allowed disabled:opacity-50"
        aria-disabled="true"
      >
        Send magic link
      </button>
      <p className="mt-2 text-[12px] leading-relaxed text-fg-muted" role="note">
        Connect Supabase to enable. No password field — we will never ask you
        to store one here in demo mode.
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-border bg-bg-muted/50 p-3.5">
        <p className="text-[11px] font-semibold tracking-tight text-fg">
          Coming with Phase 2
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-fg-muted">
          Magic link · Google · Brand Kit sync — after founder P0 keys land.
        </p>
      </div>
    </div>
  );
}
