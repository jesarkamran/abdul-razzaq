"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { ACADEMIC_COURSES, type CourseTier } from "@/data/coursesData";

const tierStyle: Record<CourseTier, string> = {
  Beginner: "bg-teal-500/15 text-teal-700 dark:text-teal-400",
  Intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Advanced: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
};

export default function CourseGrid({ exclude, limit }: { exclude?: string; limit?: number }) {
  const shown = ACADEMIC_COURSES.filter((c) => c.courseId !== exclude).slice(0, limit);

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {shown.map((c, i) => (
        <motion.div
          key={c.courseId}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: (i % 4) * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/lectures/${c.courseId}`}
            className="group flex h-full flex-col rounded-2xl border border-ink/10 p-6 transition-all
                       hover:-translate-y-1 hover:border-ink/25 dark:border-mist/10 dark:hover:border-mist/25"
          >
            <span className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest dark:bg-mist/10">
                {c.courseCode}
              </span>
              <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${tierStyle[c.tier]}`}>
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
        </motion.div>
      ))}
    </div>
  );
}
