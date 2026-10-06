"use client";

import { useRef, type ReactNode } from "react";
import { MotionConfig, motion, useMotionValue, useSpring, type Variants } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

export const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.75, ease },
  }),
};

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  i = 0,
  className,
}: {
  children: ReactNode;
  i?: number;
  className?: string;
}) {
  return (
    <motion.div
      custom={i}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  id,
  lede,
  action,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  id: string;
  lede?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`flex flex-wrap items-end justify-between gap-x-10 gap-y-7 ${className}`}>
      <div className="max-w-2xl">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-40" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-4 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05] tracking-tight text-balance"
        >
          {title}
        </h2>
        {lede && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg dark:text-mist/65">{lede}</p>
        )}
      </div>
      {action}
    </Reveal>
  );
}
