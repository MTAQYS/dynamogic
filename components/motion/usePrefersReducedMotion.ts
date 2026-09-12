"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PREF_REDUCE_MOTION, readPref } from "../os/osPrefs";

/** System preference OR Control Center "Reduce motion" toggle. */
export function usePrefersReducedMotion(): boolean {
  const framer = useReducedMotion();
  const [fallback, setFallback] = useState(false);
  const [osPref, setOsPref] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setFallback(mq.matches);
    const onChange = () => setFallback(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const sync = () => setOsPref(readPref(PREF_REDUCE_MOTION));
    sync();
    window.addEventListener("dynamogic-os-prefs", sync);
    return () => window.removeEventListener("dynamogic-os-prefs", sync);
  }, []);

  return Boolean(framer ?? fallback) || osPref;
}
