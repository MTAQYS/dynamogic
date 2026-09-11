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
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 380, damping: 36 }
        }
        role="dialog"
        aria-label={win.title}
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-bg-muted/80 px-4 backdrop-blur-md">
          <button
            type="button"
            data-window-control
            onClick={() => closeApp(win.id)}
            className="text-sm font-medium text-fg-muted"
          >
            Close
          </button>
          <span className="text-sm font-semibold text-fg">{win.title}</span>
          <span className="w-12" />
        </div>
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute flex flex-col overflow-hidden rounded-xl border border-border/80 bg-bg-paper"
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.z,
        boxShadow: focused
          ? "0 24px 64px rgba(42,42,40,0.18), 0 0 0 1px rgba(42,42,40,0.06)"
          : "0 12px 40px rgba(42,42,40,0.10), 0 0 0 1px rgba(42,42,40,0.04)",
      }}
      initial={reduced ? false : { opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.94, y: 12 }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 420, damping: 32 }
      }
      onMouseDown={() => focusApp(win.id)}
      role="dialog"
      aria-label={win.title}
      aria-modal={false}
    >
      <div
        className="flex h-10 shrink-0 cursor-grab items-center gap-3 border-b border-border bg-bg-muted/90 px-3 active:cursor-grabbing"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <div className="flex items-center gap-1.5" data-window-control>
          <button
            type="button"
            aria-label="Close window"
            data-window-control
            onClick={() => closeApp(win.id)}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#E8A0A0] transition-transform hover:scale-110"
          >
            <span className="sr-only">Close</span>
          </button>
          <button
            type="button"
            aria-label="Minimize window"
            data-window-control
            onClick={() => minimizeApp(win.id)}
            className="h-3 w-3 rounded-full bg-[#E8D49A] transition-transform hover:scale-110"
          >
            <span className="sr-only">Minimize</span>
          </button>
          <button
            type="button"
            aria-label="Focus window"
            data-window-control
            onClick={() => focusApp(win.id)}
            className="h-3 w-3 rounded-full bg-[#B8D4B0] transition-transform hover:scale-110"
          >
            <span className="sr-only">Focus</span>
          </button>
        </div>
        <span
          className={`flex-1 truncate text-center text-[12px] font-medium ${
            focused ? "text-fg" : "text-fg-muted"
          }`}
        >
          {win.title}
        </span>
        <span className="w-12" aria-hidden />
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
