"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  once = true,
  ...rest
}: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.85, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  role?: string;
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
  role,
}: StaggerProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={className} role={role}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      role={role}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-6% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 18,
  role,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  role?: string;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <div className={className} role={role}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      role={role}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Hairline that draws in from left → right on enter. */
export function HairlineDraw({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <div className={`h-px w-full bg-border ${className}`} aria-hidden />;
  }
  return (
    <motion.div
      className={`h-px origin-left bg-border ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.05, ease }}
      aria-hidden
    />
  );
}
