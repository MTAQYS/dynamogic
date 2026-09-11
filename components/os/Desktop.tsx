"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { BootSplash } from "./BootSplash";
import { DesktopIcons } from "./DesktopIcons";
import { Dock } from "./Dock";
import { GuideFalcon } from "./GuideFalcon";
import { MenuBar } from "./MenuBar";
import { StickyNote } from "./StickyNote";
import { Wallpaper } from "./Wallpaper";
import { WindowProvider, useWindows } from "./WindowContext";
import { OsWindow } from "./Window";
import { AboutApp } from "./apps/AboutApp";
import { BrandKitApp } from "./apps/BrandKitApp";
import { DemoApp } from "./apps/DemoApp";
import { FaqApp } from "./apps/FaqApp";
import { HowApp } from "./apps/HowApp";
import { McpTerminalApp } from "./apps/McpTerminalApp";
import { PricingApp } from "./apps/PricingApp";
import type { AppId } from "./types";

function AppContent({ id }: { id: AppId }) {
  switch (id) {
    case "demo":
      return <DemoApp />;
    case "brand":
      return <BrandKitApp />;
    case "mcp":
      return <McpTerminalApp />;
    case "pricing":
      return <PricingApp />;
    case "faq":
      return <FaqApp />;
    case "how":
      return <HowApp />;
    case "about":
      return <AboutApp />;
    default:
      return null;
  }
}

function DesktopInner() {
  const { windows, setIsMobile, focusedId, closeApp, blurFocus } = useWindows();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [setIsMobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && focusedId) {
        closeApp(focusedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeApp, focusedId]);

  const onBootDone = useCallback(() => setBooted(true), []);

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-bg">
      <BootSplash onDone={onBootDone} />
      <MenuBar />
      <div className="relative min-h-0 flex-1">
        {/* Wallpaper + click-outside to soft-unfocus */}
        <div
          className="absolute inset-0 z-0"
          onMouseDown={() => blurFocus()}
          aria-hidden
        >
          <Wallpaper />
        </div>
        {booted && (
          <>
            <DesktopIcons />
            <StickyNote />
            <AnimatePresence>
              {windows.map((win) => (
                <OsWindow key={win.id} win={win}>
                  <AppContent id={win.id} />
                </OsWindow>
              ))}
            </AnimatePresence>
            <GuideFalcon />
            <Dock />
          </>
        )}
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <WindowProvider>
      <DesktopInner />
    </WindowProvider>
  );
}
