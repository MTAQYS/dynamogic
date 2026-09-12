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

const EASE = [0.22, 1, 0.36, 1] as const;
const CHROME = { duration: 0.2, ease: EASE };

export function OsWindow({ win, children }: Props) {
  const {
    focusedId,
    focusApp,
    closeApp,
    minimizeApp,
    blurFocus,
    moveWindow,
    resizeWindow,
    isMobile,
  } = useWindows();
  const reduced = usePrefersReducedMotion();
  const focused = focusedId === win.id;
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const resizing = useRef(false);
  const origin = useRef({ x: 0, y: 0, wx: 0, wy: 0, ww: 0, wh: 0 });
  const live = useRef({ x: win.x, y: win.y, w: win.width, h: win.height });

  useEffect(() => {
    if (dragging.current || resizing.current) return;
    live.current = { x: win.x, y: win.y, w: win.width, h: win.height };
  }, [win.x, win.y, win.width, win.height]);

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
      live.current = { x: win.x, y: win.y, w: win.width, h: win.height };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      focusApp(win.id);
    },
    [focusApp, isMobile, win.height, win.id, win.width, win.x, win.y]
  );

  const onDragMove = useCallback((e: ReactPointerEvent) => {
    if (!dragging.current || !frameRef.current) return;
    const dx = e.clientX - origin.current.x;
    const dy = e.clientY - origin.current.y;
    const maxY = Math.max(40, window.innerHeight - 80);
    const nextY = Math.min(maxY, Math.max(28, origin.current.wy + dy));
    const nextX = origin.current.wx + dx;
    live.current.x = nextX;
    live.current.y = nextY;
    frameRef.current.style.transform = `translate3d(${nextX - win.x}px, ${nextY - win.y}px, 0)`;
  }, [win.x, win.y]);

  const onDragEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    if (frameRef.current) frameRef.current.style.transform = "";
    moveWindow(win.id, live.current.x, live.current.y);
  }, [moveWindow, win.id]);

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
      live.current = { x: win.x, y: win.y, w: win.width, h: win.height };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      focusApp(win.id);
    },
    [focusApp, isMobile, win.height, win.id, win.width, win.x, win.y]
  );

  const onResizeMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!resizing.current || !frameRef.current) return;
      const dx = e.clientX - origin.current.x;
      const dy = e.clientY - origin.current.y;
      const nextW = Math.max(320, origin.current.ww + dx);
      const nextH = Math.max(240, origin.current.wh + dy);
      live.current.w = nextW;
      live.current.h = nextH;
      const sx = nextW / origin.current.ww;
      const sy = nextH / origin.current.wh;
      frameRef.current.style.transformOrigin = "top left";
      frameRef.current.style.transform = `scale(${sx}, ${sy})`;
    },
    []
  );

  const onResizeEnd = useCallback(() => {
    if (!resizing.current) return;
    resizing.current = false;
    if (frameRef.current) {
      frameRef.current.style.transform = "";
      frameRef.current.style.transformOrigin = "";
    }
    resizeWindow(win.id, live.current.w, live.current.h);
  }, [resizeWindow, win.id]);

  useEffect(() => {
    if (!focused) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        ev.stopPropagation();
        blurFocus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [blurFocus, focused]);

  if (win.minimized && !isMobile) return null;

  if (isMobile) {
    if (!focused) return null;
    return (
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col bg-bg-paper"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: 8 }}
        transition={reduced ? { duration: 0 } : CHROME}
        role="dialog"
        aria-label={win.title}
      >
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
      ref={frameRef}
      className="absolute flex flex-col overflow-hidden rounded-2xl bg-bg-paper will-change-transform"
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.z,
        border: "0.5px solid rgba(42,42,40,0.12)",
        boxShadow: focused
          ? "0 8px 24px rgba(26,26,26,0.10), 0 0 0 0.5px rgba(26,26,26,0.06)"
          : "0 1px 2px rgba(26,26,26,0.06), 0 0 0 0.5px rgba(26,26,26,0.04)",
      }}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{
        opacity: focused ? 1 : 0.92,
        y: 0,
      }}
      exit={reduced ? undefined : { opacity: 0, y: 6 }}
      transition={reduced ? { duration: 0 } : CHROME}
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
