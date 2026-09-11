"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Combined: Framer's hook + SSR-safe fallback. */
export function usePrefersReducedMotion(): boolean {
  const framer = useReducedMotion();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setFallback(mq.matches);
    const onChange = () => setFallback(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return framer ?? fallback;
}
