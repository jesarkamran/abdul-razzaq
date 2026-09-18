"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import portrait from "@/public/profile.jpg";
import { profile, researchAreas } from "@/lib/data";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden px-6 pt-32 pb-24 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2
                   rounded-full bg-teal-500/15 blur-[120px] dark:bg-teal-500/20"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            custom={0} initial="hidden" animate="show" variants={rise}
            className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-500"
          >
            {profile.role} · QAU Islamabad
          </motion.p>

          <motion.h1
            custom={1} initial="hidden" animate="show" variants={rise}
            className="mt-5 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            custom={2} initial="hidden" animate="show" variants={rise}
            className="mt-6 max-w-xl text-lg text-ink/70 dark:text-mist/70"
          >
            Teaching financial management and accounting at the {profile.school} — and
            researching digital financial inclusion, fintech adoption and the economics of
            green innovation.
          </motion.p>

          <motion.div
            custom={3} initial="hidden" animate="show" variants={rise}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/#booking"
              className="group rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper
                         transition-transform duration-200 hover:-translate-y-0.5 dark:bg-mist dark:text-void"
            >
              Book a Session
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/lectures"
              className="rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium
                         transition-colors duration-200 hover:border-ink/40 hover:bg-ink/5
                         dark:border-mist/20 dark:hover:border-mist/50 dark:hover:bg-mist/5"
            >
              Watch Latest Lecture
            </Link>
          </motion.div>

          <motion.dl
            custom={4} initial="hidden" animate="show" variants={rise}
            className="mt-12 flex gap-10 border-t border-ink/10 pt-7 dark:border-mist/10"
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
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Square source (316px), so the frame is square too — no crop, no upscale. */}
          <div className="aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br
                          from-teal-500/25 to-ink/10 shadow-2xl shadow-ink/10 dark:to-mist/5 dark:shadow-black/40">
            <Image
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              priority
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden max-w-[16rem] flex-wrap gap-1.5 rounded-2xl
                          bg-paper/80 p-3 backdrop-blur md:flex dark:bg-void/80">
            {researchAreas.slice(0, 4).map((a) => (
              <span key={a} className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] dark:bg-mist/10">
                {a}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
