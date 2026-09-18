"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import portrait from "@/public/profile.jpg";
import { profile, researchAreas } from "@/lib/data";
import { rise, ease, Magnetic } from "./ui";

// The first four research areas float around the portrait — one position and
// drift phase each, so they stay in sync with lib/data.
const badges = researchAreas.slice(0, 4).map((label, i) => ({
  label,
  pos: ["-left-6 top-10", "-right-4 top-1/3", "-left-10 bottom-1/3", "-right-6 bottom-16"][i],
  delay: i * 0.6,
}));

export default function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden px-5 pt-32 pb-20 sm:px-6 md:pt-48 md:pb-28">
      {/* Mesh glow sitting directly behind the headline */}
      <div
        aria-hidden
        className="mesh -top-32 left-[6%] -z-10 h-[22rem] w-full bg-teal-500/25 md:h-[34rem] md:w-[46rem] dark:bg-teal-500/30"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div>
          <motion.p
            custom={0} initial="hidden" animate="show" variants={rise}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-[11px]
                       uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_10px_2px] shadow-teal-500/60" />
            {profile.role} · QAU Islamabad
          </motion.p>

          <motion.h1
            custom={1} initial="hidden" animate="show" variants={rise}
            className="mt-6 font-display text-[clamp(3rem,13vw,4.5rem)] leading-[1.02] tracking-tight md:text-8xl"
          >
            Dr. Abdul
            <span className="block bg-gradient-to-r from-ink via-ink to-teal-600 bg-clip-text text-transparent
                             dark:from-mist dark:via-mist dark:to-teal-400">
              Razzaq
            </span>
          </motion.h1>

          <motion.p
            custom={2} initial="hidden" animate="show" variants={rise}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg dark:text-mist/70"
          >
            Teaching financial management and accounting at the {profile.school} — and
            researching digital financial inclusion, fintech adoption and the economics of
            green innovation.
          </motion.p>

          <motion.div
            custom={3} initial="hidden" animate="show" variants={rise}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Magnetic strength={0.25} className="max-sm:w-full">
              <Link
                href="/#booking"
                className="glow-btn group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink
                           px-7 py-3.5 text-sm font-medium text-paper transition-transform duration-300
                           hover:scale-[1.03] sm:w-auto dark:bg-mist dark:text-void"
              >
                Book a Session
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25} className="max-sm:w-full">
              <Link
                href="/lectures"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full glass px-7 py-3.5
                           text-sm font-medium transition-colors hover:border-teal-500/50 sm:w-auto"
              >
                <Play size={14} className="fill-current transition-transform group-hover:scale-110" />
                Watch Latest Lecture
              </Link>
            </Magnetic>
          </motion.div>

          <motion.dl
            custom={4} initial="hidden" animate="show" variants={rise}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8 md:hidden dark:border-mist/10"
          >
            {profile.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl">{s.value}</dt>
                <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="relative"
        >
          {/* Square source (316px), so the frame is square too — no crop, no upscale. */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-ink/10
                          bg-gradient-to-br from-teal-500/30 via-transparent to-gold-400/20
                          shadow-[0_40px_120px_-40px_rgba(0,0,0,.55)] dark:border-mist/10">
            <Image
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              priority
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="h-full w-full object-cover"
            />
            {/* Gradient scrim so the floating card below stays legible */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>

          {/* Floating, drifting research tags */}
          {badges.map((b) => (
            <motion.span
              key={b.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.6 + b.delay * 0.2 },
                scale: { duration: 0.6, delay: 0.6 + b.delay * 0.2 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: b.delay },
              }}
              className={`glass-strong absolute ${b.pos} hidden rounded-full px-3.5 py-1.5 font-mono text-[10px]
                          tracking-wide shadow-lg lg:block`}
            >
              {b.label}
            </motion.span>
          ))}

          {/* Stats as a glass card overlapping the portrait */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="glass-strong absolute -bottom-8 left-1/2 hidden w-[88%] -translate-x-1/2 justify-between
                       rounded-2xl px-6 py-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,.6)] md:flex"
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="font-display text-3xl leading-none">{s.value}</dt>
                <dd className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/55 dark:text-mist/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
