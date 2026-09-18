"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile, publications } from "@/lib/data";
import { courseById } from "@/data/coursesData";

export default function Research() {
  return (
    <section id="research" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-500">
              Research
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Selected Publications
            </h2>
          </div>
          <a
            href={profile.links.researchgate}
            target="_blank" rel="noopener noreferrer"
            className="rounded-full border border-ink/15 px-6 py-3 text-sm transition-colors
                       hover:border-ink/40 hover:bg-ink/5 dark:border-mist/20 dark:hover:border-mist/50 dark:hover:bg-mist/5"
          >
            All 9 on ResearchGate ↗
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {publications.map((p, i) => {
            const course = courseById(p.courseId);
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col rounded-2xl border border-ink/10 p-7 transition-colors
                           hover:border-ink/25 dark:border-mist/10 dark:hover:border-mist/25"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                  {p.year} · {p.venue}
                </p>
                <h3 className="mt-3 font-display text-xl leading-snug">{p.title}</h3>

                {/* CSS-only reveal — no JS, no layout thrash. */}
                <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-ink/65 opacity-0
                              transition-all duration-500 group-hover:mt-4 group-hover:max-h-56
                              group-hover:opacity-100 dark:text-mist/65">
                  {p.abstract}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.areas.map((a) => (
                    <li key={a} className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] dark:bg-mist/10">
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/10 pt-5 text-xs dark:border-mist/10">
                  <a
                    href={profile.links.researchgate}
                    target="_blank" rel="noopener noreferrer"
                    className="transition-colors hover:text-teal-600"
                  >
                    ResearchGate ↗
                  </a>
                  {course && (
                    <Link
                      href={`/lectures/${course.courseId}`}
                      className="text-ink/50 transition-colors hover:text-teal-600 dark:text-mist/50"
                    >
                      {course.courseCode} lectures →
                    </Link>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
