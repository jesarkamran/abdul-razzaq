"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Play } from "lucide-react";
import { ACADEMIC_COURSES, type CourseTier } from "@/data/coursesData";
import { Reveal, Spotlight } from "./ui";

// One accent per level: badge tint + the card's top hairline.
const tier: Record<CourseTier, { badge: string; rule: string }> = {
  Beginner: {
    badge: "bg-teal-500/15 text-teal-700 dark:text-teal-400",
    rule: "from-teal-500/70",
  },
  Intermediate: {
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    rule: "from-amber-500/70",
  },
  Advanced: {
    badge: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
    rule: "from-violet-500/70",
  },
};

export default function CourseGrid({ exclude, limit }: { exclude?: string; limit?: number }) {
  const shown = ACADEMIC_COURSES.filter((c) => c.courseId !== exclude).slice(0, limit);

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {shown.map((c, i) => (
        <Reveal key={c.courseId} i={i % 4}>
          <Spotlight className="card group relative h-full overflow-hidden">
            {/* Level accent along the top edge */}
            <span
              aria-hidden
              className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${tier[c.tier].rule} to-transparent`}
            />
            <Link href={`/lectures/${c.courseId}`} className="flex h-full flex-col p-6">
              <span className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest dark:bg-mist/10">
                  {c.courseCode}
                </span>
                <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${tier[c.tier].badge}`}>
                  {c.tier}
                </span>
              </span>

              <h3 className="mt-4 font-display text-xl leading-snug">{c.title}</h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60 line-clamp-3 dark:text-mist/60">
                {c.description}
              </p>

              <span className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 font-mono text-[11px] uppercase tracking-widest text-ink/45 dark:border-mist/10 dark:text-mist/45">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5"><BookOpen size={12} />{c.lectureCount}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} />{c.totalDuration}</span>
                </span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Play affordance — scales in from the corner on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-5 top-5 grid h-10 w-10 scale-75 place-items-center
                         rounded-full bg-teal-500 text-white opacity-0 shadow-lg shadow-teal-500/40
                         transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
            >
              <Play size={14} className="ml-0.5 fill-current" />
            </span>
          </Spotlight>
        </Reveal>
      ))}
    </div>
  );
}
