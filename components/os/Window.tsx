"use client";

import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import { useWindows } from "./WindowContext";
import type { WindowState } from "./types";

type Props = {
  win: WindowState;
  children: ReactNode;
};

const SPRING = { type: "spring" as const, stiffness: 380, damping: 34, mass: 0.85 };

export function OsWindow({ win, children }: Props) {
  const {
    focusedId,
    focusApp,
    closeApp,
    minimizeApp,
    moveWindow,
    resizeWindow,
    isMobile,
  } = useWindows();
  const reduced = usePrefersReducedMotion();
  const focused = focusedId === win.id;
  const dragging = useRef(false);
  const resizing = useRef(false);
  const origin = useRef({ x: 0, y: 0, wx: 0, wy: 0, ww: 0, wh: 0 });

  const onDragStart = useCallback(
    (e: ReactPointerEvent) => {
      if (isMobile) return;
      if ((e.target as HTMLElement).closest("[data-window-control]")) return;
      dragging.current = true;
      origin.current = {
        x: e.clientX,
        y: e.clientY,
        wx: win.x,
        wy: win.y,
        ww: win.width,
        wh: win.height,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      focusApp(win.id);
    },
    [focusApp, isMobile, win.height, win.id, win.width, win.x, win.y]
  );

  const onDragMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - origin.current.x;
      const dy = e.clientY - origin.current.y;
      const maxY = Math.max(40, window.innerHeight - 80);
      const nextY = Math.min(maxY, Math.max(28, origin.current.wy + dy));
      const nextX = origin.current.wx + dx;
      moveWindow(win.id, nextX, nextY);
    },
    [moveWindow, win.id]
  );

  const onDragEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  const onResizeStart = useCallback(
    (e: ReactPointerEvent) => {
      if (isMobile) return;
      e.stopPropagation();
      resizing.current = true;
      origin.current = {
        x: e.clientX,
        y: e.clientY,
        wx: win.x,
        wy: win.y,
        ww: win.width,
        wh: win.height,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      focusApp(win.id);
    },
    [focusApp, isMobile, win.height, win.id, win.width, win.x, win.y]
  );

  const onResizeMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!resizing.current) return;
      const dx = e.clientX - origin.current.x;
      const dy = e.clientY - origin.current.y;
      resizeWindow(win.id, origin.current.ww + dx, origin.current.wh + dy);
    },
    [resizeWindow, win.id]
  );

  const onResizeEnd = useCallback(() => {
    resizing.current = false;
  }, []);

  useEffect(() => {
    if (!focused) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") closeApp(win.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeApp, focused, win.id]);

  if (win.minimized && !isMobile) return null;

  if (isMobile) {
    if (!focused) return null;
    return (
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col bg-bg-paper"
        initial={reduced ? false : { y: "100%" }}
        animate={{ y: 0 }}
        exit={reduced ? undefined : { y: "100%" }}
        transition={reduced ? { duration: 0 } : SPRING}
        role="dialog"
        aria-label={win.title}
      >
        {/* Premium sheet chrome */}
        <div className="flex shrink-0 flex-col border-b border-border/70 bg-bg-paper/95 backdrop-blur-xl">
          <div className="flex justify-center pt-2 pb-1" aria-hidden>
            <span className="h-1 w-9 rounded-full bg-fg/15" />
          </div>
          <div className="flex h-11 items-center justify-between px-4 pb-1">
            <button
              type="button"
              data-window-control
              onClick={() => closeApp(win.id)}
              className="rounded-full px-2 py-1 text-[13px] font-medium text-fg/55 transition-colors hover:bg-fg/[0.05] hover:text-fg"
            >
              Close
            </button>
            <span className="text-[14px] font-semibold tracking-tight text-fg">
              {win.title.replace(/\.app$/, "")}
            </span>
            <span className="w-12" />
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute flex flex-col overflow-hidden rounded-2xl bg-bg-paper"
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.z,
        border: "0.5px solid rgba(42,42,40,0.12)",
        boxShadow: focused
          ? "0 28px 72px -12px rgba(42,42,40,0.22), 0 12px 28px -8px rgba(42,42,40,0.10), 0 0 0 0.5px rgba(42,42,40,0.06)"
          : "0 16px 48px -12px rgba(42,42,40,0.12), 0 6px 16px -4px rgba(42,42,40,0.06), 0 0 0 0.5px rgba(42,42,40,0.04)",
      }}
      initial={reduced ? false : { opacity: 0, scale: 0.96, y: 10 }}
      animate={{
        opacity: focused ? 1 : 0.92,
        scale: 1,
        y: 0,
      }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
      transition={reduced ? { duration: 0 } : SPRING}
      onMouseDown={() => focusApp(win.id)}
      role="dialog"
      aria-label={win.title}
      aria-modal={false}
    >
      <div
        className={`flex h-11 shrink-0 cursor-grab items-center gap-3 border-b px-3.5 active:cursor-grabbing ${
          focused
            ? "border-border/70 bg-bg-muted/70"
            : "border-border/50 bg-bg-muted/40"
        }`}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <div className="flex items-center gap-2" data-window-control>
          <TrafficLight
            color="#FF5F57"
            border="#E0443E"
            label="Close window"
            onClick={() => closeApp(win.id)}
            symbol="×"
          />
          <TrafficLight
            color="#FEBC2E"
            border="#DEA123"
            label="Minimize window"
            onClick={() => minimizeApp(win.id)}
            symbol="−"
          />
          <TrafficLight
            color="#28C840"
            border="#1AAB29"
            label="Focus window"
            onClick={() => focusApp(win.id)}
            symbol="+"
          />
        </div>
        <span
          className={`flex-1 truncate text-center text-[12.5px] font-semibold tracking-tight ${
            focused ? "text-fg/90" : "text-fg/45"
          }`}
        >
          {win.title}
        </span>
        <span className="w-[52px]" aria-hidden />
      </div>
      <div className="relative min-h-0 flex-1 overflow-auto">{children}</div>
      <div
        className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
        onPointerDown={onResizeStart}
        onPointerMove={onResizeMove}
        onPointerUp={onResizeEnd}
        onPointerCancel={onResizeEnd}
        aria-hidden
      />
    </motion.div>
  );
}

function TrafficLight({
  color,
  border,
  label,
  onClick,
  symbol,
}: {
  color: string;
  border: string;
  label: string;
  onClick: () => void;
  symbol: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      data-window-control
      onClick={onClick}
      className="group flex h-[12px] w-[12px] items-center justify-center rounded-full transition-transform hover:scale-110"
      style={{
        background: color,
        boxShadow: `inset 0 0 0 0.5px ${border}`,
      }}
    >
      <span className="text-[8px] font-bold leading-none text-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        {symbol}
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
