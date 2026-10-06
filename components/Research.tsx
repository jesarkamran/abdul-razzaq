"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { profile, publications } from "@/lib/data";
import { courseById } from "@/data/coursesData";
import { Reveal, SectionHeader, Spotlight, Magnetic } from "./ui";

export default function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="px-5 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          eyebrow="Research"
          id="research-title"
          title="Selected Publications"
          lede="Peer-reviewed work on digital finance, fintech adoption and the economics of green innovation."
          action={
            <Magnetic strength={0.2}>
              <a
                href={profile.links.researchgate}
                target="_blank" rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm
                           transition-colors hover:border-accent-500/50 hover:text-accent-600 dark:hover:text-accent-400"
              >
                All 9 on ResearchGate
                <ArrowUpRight size={15} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Magnetic>
          }
        />

        <ul role="list" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
          {publications.map((p, i) => {
            const course = courseById(p.courseId);
            const featured = i === 0;
            return (
              <li
                key={p.title}
                className={featured ? "md:col-span-2 lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}
              >
                <Reveal i={i} className="h-full">
                  <Spotlight
                    className={`card group flex h-full flex-col ${featured ? "p-7 sm:p-10" : "p-6 sm:p-7"}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                        <time dateTime={String(p.year)}>{p.year}</time> · {p.venue}
                      </p>
                      {featured ? (
                        <span className="rounded-full bg-gradient-to-r from-accent-500 to-blush-400 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                          Latest
                        </span>
                      ) : (
                        <Quote size={14} aria-hidden className="text-accent-500/50 transition-colors group-hover:text-accent-500" />
                      )}
                    </div>

                    <h3
                      className={`mt-4 font-display leading-snug text-balance ${featured ? "text-3xl sm:text-4xl" : "text-xl"}`}
                    >
                      {p.title}
                    </h3>

                    <p
                      className={`mt-4 leading-relaxed text-ink/65 dark:text-mist/65
                        ${featured ? "max-w-xl text-base sm:text-lg" : "text-sm line-clamp-3"}`}
                    >
                      {p.abstract}
                    </p>

                    <ul aria-label="Topics" className="mb-8 mt-6 flex flex-wrap gap-1.5">
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
                        className="inline-flex items-center gap-1 font-medium transition-colors hover:text-accent-600 dark:hover:text-accent-400"
                      >
                        Read on ResearchGate <ArrowUpRight size={12} aria-hidden />
                        <span className="sr-only">: {p.title} (opens in a new tab)</span>
                      </a>
                      {course && (
                        <Link
                          href={`/lectures/${course.courseId}`}
                          className="group/l inline-flex items-center gap-1 text-ink/55 transition-colors hover:text-accent-600 dark:text-mist/55 dark:hover:text-accent-400"
                        >
                          {course.courseCode} lectures
                          <ArrowRight size={12} aria-hidden className="transition-transform group-hover/l:translate-x-0.5" />
                        </Link>
                      )}
                    </div>
                  </Spotlight>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
