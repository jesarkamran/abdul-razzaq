"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Play } from "lucide-react";
import portrait from "@/public/profile.jpg";
import { profile, researchAreas } from "@/lib/data";
import { rise, ease, Magnetic } from "./ui";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[min(100svh,60rem)] flex-col overflow-hidden pt-28 sm:pt-32 md:pt-36"
    >
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="mesh -top-32 left-[6%] -z-10 h-[22rem] w-full bg-accent-500/25 md:h-[34rem] md:w-[46rem] dark:bg-accent-500/30"
      />

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-5 sm:px-6 md:grid-cols-12 md:gap-10 lg:gap-16">
        <div className="md:col-span-7">
          <motion.p
            custom={0} initial="hidden" animate="show" variants={rise}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-[11px]
                       uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400"
          >
            <span aria-hidden className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent-500 opacity-60 motion-safe:animate-ping" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent-500" />
            </span>
            {profile.role} · QAU Islamabad
          </motion.p>

          <motion.h1
            id="hero-title"
            custom={1} initial="hidden" animate="show" variants={rise}
            className="mt-7 font-display text-[clamp(3rem,13vw,4.5rem)] leading-[1.02] tracking-tight md:text-7xl lg:text-8xl"
          >
            Dr. Abdul
            <span className="text-gradient block pb-2">Razzaq</span>
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
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Magnetic strength={0.25} className="max-sm:w-full">
              <Link
                href="/#booking"
                className="glow-btn group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink
                           px-7 py-3.5 text-sm font-medium text-paper transition-transform duration-300
                           hover:scale-[1.03] sm:w-auto dark:bg-mist dark:text-void"
              >
                Book a Session
                <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25} className="max-sm:w-full">
              <Link
                href="/lectures"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full glass px-7 py-3.5
                           text-sm font-medium transition-colors hover:border-accent-500/50 sm:w-auto"
              >
                <Play size={14} aria-hidden className="fill-current transition-transform group-hover:scale-110" />
                Watch Latest Lecture
              </Link>
            </Magnetic>
          </motion.div>

          <motion.dl
            custom={4} initial="hidden" animate="show" variants={rise}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8 md:hidden dark:border-mist/10"
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                  {s.label}
                </dt>
                <dd className="font-display text-3xl tabular-nums">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="relative mx-auto w-full max-w-md md:col-span-5 md:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent-500/40 via-blush-400/25 to-glow-400/40 blur-2xl"
          />
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-ink/10
                          bg-gradient-to-br from-accent-500/30 via-transparent to-blush-400/25
                          shadow-[0_40px_120px_-40px_rgba(0,0,0,.55)] dark:border-mist/10">
            <Image
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              priority
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="glass-strong absolute -bottom-8 left-1/2 hidden w-[88%] -translate-x-1/2 grid-cols-3 divide-x
                       divide-ink/10 rounded-2xl py-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,.6)] md:grid dark:divide-mist/10"
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse items-center text-center">
                <dt className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/55 dark:text-mist/55">
                  {s.label}
                </dt>
                <dd className="font-display text-3xl leading-none tabular-nums">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-20 border-y border-ink/10 py-5 md:mt-24 dark:border-mist/10"
      >
        <div className="marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-label={copy ? undefined : "Research areas"}
              aria-hidden={copy ? true : undefined}
              className="marquee-track flex shrink-0 items-center gap-10 pr-10 font-display text-xl italic text-ink/60 sm:text-2xl dark:text-mist/60"
            >
              {researchAreas.map((a) => (
                <li key={a} className="flex shrink-0 items-center gap-10">
                  {a}
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent-500 to-glow-400" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>

      <a
        href="#about"
        className="group mx-auto my-6 hidden items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase
                   tracking-widest text-ink/50 transition-colors hover:text-accent-600 md:inline-flex dark:text-mist/50 dark:hover:text-accent-400"
      >
        Scroll to explore
        <ArrowDown size={12} aria-hidden className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
