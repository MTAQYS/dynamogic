"use client";

import { useEffect, useState } from "react";
import { Logo } from "../Logo";
import { ClockPanel } from "./ClockPanel";
import { ControlCenter } from "./ControlCenter";
import { useWindows } from "./WindowContext";
import type { AppId } from "./types";

type Panel = "menu" | "clock" | "cc" | null;

export function MenuBar() {
  const { openApp, closeApp, focusedId, windows, isMobile } = useWindows();
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [panel, setPanel] = useState<"clock" | "cc" | null>(null);

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
    const close = () => {
      setMenuOpen(null);
      setPanel(null);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(null);
        setPanel(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleMenu(name: string, e: React.MouseEvent) {
    e.stopPropagation();
    setPanel(null);
    setMenuOpen((cur) => (cur === name ? null : name));
  }

  function togglePanel(next: "clock" | "cc", e: React.MouseEvent) {
    e.stopPropagation();
    setMenuOpen(null);
    setPanel((cur) => (cur === next ? null : next));
  }

  function open(id: AppId) {
    openApp(id);
    setMenuOpen(null);
    setPanel(null);
  }

  return (
    <header className="relative z-[200] flex h-8 shrink-0 items-center justify-between border-b border-border/60 bg-bg-paper/90 px-2 text-[12px] shadow-soft backdrop-blur-md sm:h-7 sm:px-3">
      <nav className="flex items-center gap-0.5" aria-label="Menu bar">
        <button
          type="button"
          onClick={(e) => toggleMenu("dynamogic", e)}
          className={`flex min-h-[44px] items-center gap-1.5 rounded-md px-2 font-semibold text-fg transition-colors hover:bg-fg/[0.05] sm:min-h-0 sm:py-0.5 sm:px-1.5 ${
            menuOpen === "dynamogic" ? "bg-fg/[0.06]" : ""
          }`}
          aria-expanded={menuOpen === "dynamogic"}
        >
          <Logo size={12} className="!gap-1.5 [&_span]:!font-semibold" />
        </button>
        {(["File", "Window", "Help"] as const).map((label) => (
          <button
            key={label}
            type="button"
            onClick={(e) => toggleMenu(label.toLowerCase(), e)}
            className={`hidden min-h-[44px] rounded-md px-2 text-[12px] font-medium tracking-tight transition-colors hover:bg-fg/[0.05] sm:inline-flex sm:min-h-0 sm:items-center sm:py-0.5 ${
              menuOpen === label.toLowerCase()
                ? "bg-fg/[0.06] text-fg"
                : "text-fg/65"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-0.5 sm:gap-1">
        <span className="mr-1 hidden text-[10px] font-medium tracking-[0.04em] text-fg/40 md:inline">
          Dynamogic OS
        </span>
        <button
          type="button"
          onClick={(e) => togglePanel("cc", e)}
          aria-label="Control Center"
          aria-expanded={panel === "cc"}
          className={`flex h-11 w-11 items-center justify-center rounded-md text-fg/70 transition-colors hover:bg-fg/[0.05] hover:text-fg sm:h-7 sm:w-7 ${
            panel === "cc" ? "bg-fg/[0.06] text-fg" : ""
          }`}
        >
          <CcIcon />
        </button>
        <button
          type="button"
          onClick={(e) => togglePanel("clock", e)}
          aria-label="Open calendar"
          aria-expanded={panel === "clock"}
          className={`flex min-h-[44px] items-center rounded-md px-2 text-[12px] font-medium tabular-nums tracking-tight text-fg/85 transition-colors hover:bg-fg/[0.05] sm:min-h-0 sm:py-0.5 ${
            panel === "clock" ? "bg-fg/[0.06] text-fg" : ""
          }`}
        >
          <time dateTime={new Date().toISOString()}>{time || "—"}</time>
        </button>
      </div>

      {menuOpen === "dynamogic" && (
        <Dropdown left={8}>
          <MenuItem onClick={() => open("about")}>About Dynamogic</MenuItem>
          <MenuItem onClick={() => open("demo")}>Open Demo</MenuItem>
          <Divider />
          <MenuItem onClick={() => open("signin")}>Sign in (demo)</MenuItem>
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
          <MenuItem onClick={() => open("bepro")}>BePro</MenuItem>
          <MenuItem onClick={() => open("docs")}>Docs</MenuItem>
          <MenuItem onClick={() => open("mcp")}>MCP Terminal</MenuItem>
          <MenuItem onClick={() => open("pricing")}>Pricing</MenuItem>
          <MenuItem onClick={() => open("faq")}>FAQ</MenuItem>
          <MenuItem onClick={() => open("signin")}>Sign in (demo)</MenuItem>
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

      <ClockPanel
        open={panel === "clock"}
        onClose={() => setPanel(null)}
        isMobile={isMobile}
      />
      <ControlCenter
        open={panel === "cc"}
        onClose={() => setPanel(null)}
        isMobile={isMobile}
      />
    </header>
  );
}

function CcIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="1" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.85" />
      <rect x="8" y="1" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.45" />
      <rect x="1" y="8" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.45" />
      <rect x="8" y="8" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.7" />
    </svg>
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
      className="absolute top-8 z-[210] min-w-[200px] overflow-hidden rounded-xl border border-border/80 bg-bg-paper py-1.5 shadow-paper sm:top-7"
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
      className="mx-1 flex min-h-[44px] w-[calc(100%-0.5rem)] items-center rounded-lg px-2.5 text-left text-[12px] font-medium tracking-tight text-fg transition-colors hover:bg-fg/[0.05] disabled:opacity-35 sm:min-h-0 sm:py-1.5"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="my-1.5 h-px bg-border/80" />;
}
