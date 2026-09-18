"use client";

import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { profile, publications } from "@/lib/data";
import { courseById } from "@/data/coursesData";
import { Reveal, Spotlight, Magnetic } from "./ui";

export default function Research() {
  return (
    <section id="research" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Research
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Selected Publications
            </h2>
          </div>
          <Magnetic strength={0.2}>
            <a
              href={profile.links.researchgate}
              target="_blank" rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm
                         transition-colors hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400"
            >
              All 9 on ResearchGate
              <ArrowUpRight size={15} />
            </a>
          </Magnetic>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {publications.map((p, i) => {
            const course = courseById(p.courseId);
            return (
              <Reveal key={p.title} i={i}>
                <Spotlight className="card group flex h-full flex-col p-7">
                  <span className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                      {p.year} · {p.venue}
                    </p>
                    <Quote size={14} className="text-teal-500/50 transition-colors group-hover:text-teal-500" />
                  </span>

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

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/10 pt-5 text-xs dark:border-mist/10">
                    <a
                      href={profile.links.researchgate}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      ResearchGate <ArrowUpRight size={12} />
                    </a>
                    {course && (
                      <Link
                        href={`/lectures/${course.courseId}`}
                        className="text-ink/50 transition-colors hover:text-teal-600 dark:text-mist/50 dark:hover:text-teal-400"
                      >
                        {course.courseCode} lectures →
                      </Link>
                    )}
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
