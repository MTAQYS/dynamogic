"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "../Logo";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";

export function BootSplash({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(!reduced);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const t = window.setTimeout(() => {
      setShow(false);
      onDone();
    }, 1400);
    return () => window.clearTimeout(t);
  }, [onDone, reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo className="scale-125" />
          </motion.div>
          <motion.p
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.32em] text-fg-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            Dynamogic OS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
