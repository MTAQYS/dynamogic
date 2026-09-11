"use client";

import { useEffect, useState } from "react";
import { Logo } from "../Logo";
import { useWindows } from "./WindowContext";
import type { AppId } from "./types";

export function MenuBar() {
  const { openApp, closeApp, focusedId, windows } = useWindows();
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString([], {
          weekday: "short",
          hour: "numeric",
          minute: "2-digit",
        })
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  function toggle(name: string, e: React.MouseEvent) {
    e.stopPropagation();
    setMenuOpen((cur) => (cur === name ? null : name));
  }

  function open(id: AppId) {
    openApp(id);
    setMenuOpen(null);
  }

  return (
    <header className="relative z-[200] flex h-7 shrink-0 items-center justify-between border-b border-border/60 bg-bg-paper/90 px-3 text-[12px] shadow-soft backdrop-blur-md">
      <nav className="flex items-center gap-0.5" aria-label="Menu bar">
        <button
          type="button"
          onClick={(e) => toggle("dynamogic", e)}
          className={`flex items-center gap-1.5 rounded-md px-1.5 py-0.5 font-semibold text-fg transition-colors hover:bg-fg/[0.05] ${
            menuOpen === "dynamogic" ? "bg-fg/[0.06]" : ""
          }`}
        >
          <Logo size={12} className="!gap-1.5 [&_span]:!font-semibold" />
        </button>
        {(["File", "Window", "Help"] as const).map((label) => (
          <button
            key={label}
            type="button"
            onClick={(e) => toggle(label.toLowerCase(), e)}
            className={`rounded-md px-2 py-0.5 text-[12px] font-medium tracking-tight transition-colors hover:bg-fg/[0.05] ${
              menuOpen === label.toLowerCase()
                ? "bg-fg/[0.06] text-fg"
                : "text-fg/65"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <span className="hidden text-[10px] font-medium tracking-[0.04em] text-fg/40 sm:inline">
          Dynamogic OS
        </span>
        <time
          className="text-[12px] font-medium tabular-nums tracking-tight text-fg/85"
          dateTime={new Date().toISOString()}
        >
          {time}
        </time>
      </div>

      {menuOpen === "dynamogic" && (
        <Dropdown left={8}>
          <MenuItem onClick={() => open("about")}>About Dynamogic</MenuItem>
          <MenuItem onClick={() => open("how")}>How it works</MenuItem>
          <Divider />
          <MenuItem onClick={() => open("demo")}>Open Demo</MenuItem>
        </Dropdown>
      )}
      {menuOpen === "file" && (
        <Dropdown left={88}>
          <MenuItem onClick={() => open("demo")}>New PDF demo</MenuItem>
          <MenuItem onClick={() => open("brand")}>Open Brand Kit</MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              if (focusedId) closeApp(focusedId);
              setMenuOpen(null);
            }}
            disabled={!focusedId}
          >
            Close window
          </MenuItem>
        </Dropdown>
      )}
      {menuOpen === "window" && (
        <Dropdown left={128}>
          <MenuItem onClick={() => open("demo")}>Demo</MenuItem>
          <MenuItem onClick={() => open("brand")}>Brand Kit</MenuItem>
          <MenuItem onClick={() => open("mcp")}>MCP Terminal</MenuItem>
          <MenuItem onClick={() => open("pricing")}>Pricing</MenuItem>
          <MenuItem onClick={() => open("faq")}>FAQ</MenuItem>
          <Divider />
          <p className="px-3 py-1.5 text-[11px] text-fg-muted">
            {windows.filter((w) => !w.minimized).length} open
          </p>
        </Dropdown>
      )}
      {menuOpen === "help" && (
        <Dropdown left={188}>
          <MenuItem onClick={() => open("faq")}>FAQ</MenuItem>
          <MenuItem onClick={() => open("how")}>How it works</MenuItem>
          <MenuItem onClick={() => open("about")}>About</MenuItem>
        </Dropdown>
      )}
    </header>
  );
}

function Dropdown({
  children,
  left,
}: {
  children: React.ReactNode;
  left: number;
}) {
  return (
    <div
      className="absolute top-7 z-[210] min-w-[188px] overflow-hidden rounded-xl border border-border/80 bg-bg-paper py-1.5 shadow-paper backdrop-blur-md"
      style={{ left }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

function MenuItem({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mx-1 flex w-[calc(100%-0.5rem)] rounded-lg px-2.5 py-1.5 text-left text-[12px] font-medium tracking-tight text-fg transition-colors hover:bg-fg/[0.05] disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="my-1.5 h-px bg-border/80" />;
}
