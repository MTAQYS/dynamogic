"use client";

import { useWindows } from "./WindowContext";
import { APP_META, type AppId } from "./types";

const ICONS: AppId[] = ["demo", "brand", "mcp", "pricing", "faq", "about"];

export function DesktopIcons() {
  const { openApp, isMobile } = useWindows();

  if (isMobile) return null;

  return (
    <ul
      className="absolute left-4 top-12 z-10 flex flex-col gap-3"
      aria-label="Desktop icons"
    >
      {ICONS.map((id) => {
        const meta = APP_META[id];
        return (
          <li key={id}>
            <button
              type="button"
              onDoubleClick={() => openApp(id)}
              onClick={() => openApp(id)}
              className="group flex w-[76px] flex-col items-center gap-1.5 rounded-lg p-2 text-center hover:bg-fg/[0.04] focus-visible:bg-fg/[0.06]"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-bg-paper/90 text-2xl shadow-soft backdrop-blur-sm transition-transform group-hover:scale-105"
                aria-hidden
              >
                {meta.icon}
              </span>
              <span className="text-[11px] font-medium leading-tight text-fg drop-shadow-sm">
                {meta.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
