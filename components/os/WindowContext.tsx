"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  APP_META,
  DEFAULT_BRAND,
  type AppId,
  type BrandKitState,
  type WindowState,
} from "./types";

type WindowContextValue = {
  windows: WindowState[];
  focusedId: AppId | null;
  brand: BrandKitState;
  setBrand: (b: BrandKitState | ((prev: BrandKitState) => BrandKitState)) => void;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  blurFocus: () => void;
  moveWindow: (id: AppId, x: number, y: number) => void;
  resizeWindow: (id: AppId, width: number, height: number) => void;
  bounceId: AppId | null;
  isMobile: boolean;
  setIsMobile: (v: boolean) => void;
};

const WindowContext = createContext<WindowContextValue | null>(null);

let zCounter = 10;

function defaultPosition(id: AppId, index: number) {
  const meta = APP_META[id];
  const offset = (index % 5) * 28;
  return {
    x: 96 + offset,
    y: 48 + offset,
    width: meta.defaultSize.w,
    height: meta.defaultSize.h,
  };
}

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<AppId | null>(null);
  const [brand, setBrand] = useState<BrandKitState>(DEFAULT_BRAND);
  const [bounceId, setBounceId] = useState<AppId | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const openApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        zCounter += 1;
        setFocusedId(id);
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: false, z: zCounter } : w
        );
      }
      zCounter += 1;
      const pos = defaultPosition(id, prev.length);
      setFocusedId(id);
      return [
        ...prev,
        {
          id,
          title: APP_META[id].title,
          ...pos,
          minimized: false,
          z: zCounter,
        },
      ];
    });
    setBounceId(id);
    window.setTimeout(() => setBounceId(null), 220);
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((cur) => (cur === id ? null : cur));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setFocusedId((cur) => (cur === id ? null : cur));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    zCounter += 1;
    setFocusedId(id);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, minimized: false, z: zCounter } : w
      )
    );
  }, []);

  const blurFocus = useCallback(() => {
    setFocusedId(null);
  }, []);

  const moveWindow = useCallback((id: AppId, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const resizeWindow = useCallback(
    (id: AppId, width: number, height: number) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                width: Math.max(320, width),
                height: Math.max(240, height),
              }
            : w
        )
      );
    },
    []
  );

  const value = useMemo(
    () => ({
      windows,
      focusedId,
      brand,
      setBrand,
      openApp,
      closeApp,
      minimizeApp,
      focusApp,
      blurFocus,
      moveWindow,
      resizeWindow,
      bounceId,
      isMobile,
      setIsMobile,
    }),
    [
      windows,
      focusedId,
      brand,
      openApp,
      closeApp,
      minimizeApp,
      focusApp,
      blurFocus,
      moveWindow,
      resizeWindow,
      bounceId,
      isMobile,
    ]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error("useWindows must be used within WindowProvider");
  return ctx;
}
