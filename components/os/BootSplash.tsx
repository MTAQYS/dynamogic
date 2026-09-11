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
    }, 900);
    return () => window.clearTimeout(t);
  }, [onDone, reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo size={22} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
