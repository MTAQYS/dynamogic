"use client";

import { useState } from "react";
import { AppIcon } from "./AppIcon";
import { useWindows } from "./WindowContext";
import { APP_META, type AppId } from "./types";

const ICONS: AppId[] = ["demo", "brand", "bepro", "mcp", "pricing", "faq", "about"];

export function DesktopIcons() {
  const { openApp, isMobile } = useWindows();
  const [selected, setSelected] = useState<AppId | null>(null);

  if (isMobile) return null;

  return (
    <ul
      className="absolute left-3 top-10 z-[5] flex flex-col gap-1"
      aria-label="Desktop icons"
    >
      {ICONS.map((id) => {
        const meta = APP_META[id];
        const isSelected = selected === id;
        return (
          <li key={id}>
            <button
              type="button"
              title={meta.label}
              aria-label={meta.label}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(id);
                openApp(id);
              }}
              onDoubleClick={() => openApp(id)}
              className={`group flex w-[92px] flex-col items-center gap-1.5 rounded-xl px-2 py-2.5 text-center transition-colors ${
                isSelected
                  ? "bg-fg/[0.07] ring-1 ring-fg/[0.06]"
                  : "hover:bg-fg/[0.035]"
              }`}
            >
              <span
                className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-border/50 bg-bg-paper shadow-[0_2px_8px_rgba(42,42,40,0.05),inset_0_1px_0_rgba(255,255,255,0.7)]  transition-transform duration-200 group-hover:scale-[1.04]"
                aria-hidden
              >
                <AppIcon id={id} size={24} />
              </span>
              <span
                className={`max-w-full whitespace-normal break-words rounded-md px-1 py-0.5 text-[11px] font-medium leading-tight tracking-tight ${
                  isSelected ? "bg-fg/80 text-invert-fg" : "text-fg/90"
                }`}
              >
                {meta.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
