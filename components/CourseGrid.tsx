"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { ACADEMIC_COURSES, type CourseTier } from "@/data/coursesData";
import { Reveal, Spotlight } from "./ui";

const tier: Record<CourseTier, { badge: string; bar: string; dot: string }> = {
  Beginner: {
    badge: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/25 dark:text-emerald-400",
    bar: "from-emerald-500 to-emerald-500/0",
    dot: "bg-emerald-500",
  },
  Intermediate: {
    badge: "bg-amber-500/12 text-amber-700 ring-amber-500/25 dark:text-amber-400",
    bar: "from-amber-500 to-amber-500/0",
    dot: "bg-amber-500",
  },
  Advanced: {
    badge: "bg-rose-500/12 text-rose-700 ring-rose-500/25 dark:text-rose-400",
    bar: "from-rose-500 to-rose-500/0",
    dot: "bg-rose-500",
  },
};

export default function CourseGrid({ exclude, limit }: { exclude?: string; limit?: number }) {
  const shown = ACADEMIC_COURSES.filter((c) => c.courseId !== exclude).slice(0, limit);

  return (
    <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {shown.map((c, i) => (
        <li key={c.courseId}>
          <Reveal i={i % 4} className="h-full">
            <Spotlight className="card group flex h-full flex-col overflow-hidden p-6">
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.35] bg-gradient-to-r ${tier[c.tier].bar}
                            transition-transform duration-500 ease-out group-hover:scale-x-100 group-has-[:focus-visible]:scale-x-100`}
              />

              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-ink/12 transition-colors duration-500
                             group-hover:text-accent-600/60 dark:text-mist/12 dark:group-hover:text-accent-400/60"
                >
                  {String(c.order).padStart(2, "0")}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase
                              tracking-widest ring-1 ring-inset ${tier[c.tier].badge}`}
                >
                  <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${tier[c.tier].dot}`} />
                  {c.tier}
                </span>
              </div>

              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50 dark:text-mist/50">
                {c.courseCode}
              </p>

              <h3 className="mt-1.5 font-display text-xl leading-snug text-balance">
                <Link
                  href={`/lectures/${c.courseId}`}
                  className="outline-none after:absolute after:inset-0 after:rounded-[inherit]"
                >
                  {c.title}
                </Link>
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60 line-clamp-3 dark:text-mist/60">
                {c.description}
              </p>

              <div className="mt-6 flex items-end justify-between gap-3 border-t border-ink/10 pt-4 dark:border-mist/10">
                <dl className="flex gap-5">
                  <div>
                    <dt className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                      <BookOpen size={11} aria-hidden /> Lectures
                    </dt>
                    <dd className="mt-0.5 text-base font-medium tabular-nums">{c.lectureCount}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                      <Clock size={11} aria-hidden /> Runtime
                    </dt>
                    <dd className="mt-0.5 text-base font-medium tabular-nums">{c.totalDuration}</dd>
                  </div>
                </dl>
                <span
                  aria-hidden
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/12 transition-all duration-300
                             group-hover:rotate-45 group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-white
                             dark:border-mist/15"
                >
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </Spotlight>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
