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
    <header className="relative z-[200] flex h-8 shrink-0 items-center justify-between border-b border-border/60 bg-bg-paper/70 px-3 text-[12px] backdrop-blur-xl">
      <nav className="flex items-center gap-1" aria-label="Menu bar">
        <button
          type="button"
          onClick={(e) => toggle("dynamogic", e)}
          className="flex items-center gap-1.5 rounded px-2 py-0.5 font-semibold text-fg hover:bg-fg/5"
        >
          <Logo className="!gap-1.5 [&_span]:!text-[13px] [&_svg]:h-3.5 [&_svg]:w-3.5" />
        </button>
        {(["File", "Window", "Help"] as const).map((label) => (
          <button
            key={label}
            type="button"
            onClick={(e) => toggle(label.toLowerCase(), e)}
            className={`rounded px-2 py-0.5 text-fg/80 hover:bg-fg/5 ${
              menuOpen === label.toLowerCase() ? "bg-fg/8" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 text-fg-muted">
        <span className="hidden font-mono text-[11px] sm:inline">
          Dynamogic OS
        </span>
        <time className="tabular-nums text-fg" dateTime={new Date().toISOString()}>
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
      className="absolute top-8 z-[210] min-w-[180px] overflow-hidden rounded-lg border border-border bg-bg-paper/95 py-1 shadow-paper backdrop-blur-xl"
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
      className="flex w-full px-3 py-1.5 text-left text-[12px] text-fg hover:bg-fg/5 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="my-1 h-px bg-border" />;
}
