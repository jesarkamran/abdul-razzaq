"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen, ChevronDown, Clock, GraduationCap, Layers, MonitorPlay, Play, Search, X,
} from "lucide-react";
import LecturePlayer from "./LecturePlayer";
import {
  ACADEMIC_COURSES, TIERS, TOTAL_LECTURES, TOTAL_RUNTIME,
  type AcademicCourse, type CourseTier, type VideoRecord,
} from "@/data/coursesData";
import { profile } from "@/lib/data";

const tierStyle: Record<CourseTier, string> = {
  Beginner: "bg-teal-500/15 text-teal-700 dark:text-teal-400",
  Intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Advanced: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function LecturesHub() {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<CourseTier | "All">("All");
  const [open, setOpen] = useState<string | null>(ACADEMIC_COURSES[0].courseId);
  const [playing, setPlaying] = useState<{ course: AcademicCourse; video: VideoRecord } | null>(null);

  const q = query.trim().toLowerCase();

  // One pass: filter by tier, then by text across title, tag and syllabus.
  const results = useMemo(() => {
    return ACADEMIC_COURSES
      .filter((c) => tier === "All" || c.tier === tier)
      .map((c) => {
        if (!q) return { course: c, videos: c.videos, hit: false };
        const courseHit =
          c.title.toLowerCase().includes(q) ||
          c.courseCode.toLowerCase().includes(q) ||
          c.syllabusHighlights.some((s) => s.toLowerCase().includes(q));
        const videos = c.videos.filter(
          (v) => v.title.toLowerCase().includes(q) || v.topicTag.toLowerCase().includes(q)
        );
        return { course: c, videos: courseHit && videos.length === 0 ? c.videos : videos, hit: courseHit };
      })
      .filter((r) => r.videos.length > 0 || r.hit);
  }, [q, tier]);

  const matchCount = results.reduce((acc, r) => acc + r.videos.length, 0);
  const isSearching = q.length > 0;

  return (
    <>
      <section className="px-6 pt-36 pb-28">
        <div className="mx-auto max-w-6xl">
          {/* ---------- Header ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-500">
              Lectures & Courses
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
              A full curriculum, in the order you should watch it
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65 dark:text-mist/65">
              {TOTAL_LECTURES} recorded lectures across eight courses — from double-entry
              bookkeeping through to ratio analysis and capital markets. Each course builds
              on the one before it.
            </p>

            <dl className="mt-10 flex flex-wrap gap-10 border-t border-ink/10 pt-7 dark:border-mist/10">
              {[
                { icon: Layers, value: ACADEMIC_COURSES.length, label: "Courses" },
                { icon: BookOpen, value: TOTAL_LECTURES, label: "Lectures" },
                { icon: Clock, value: TOTAL_RUNTIME, label: "Total runtime" },
                { icon: GraduationCap, value: "4", label: "Progression levels" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="flex items-center gap-2 font-display text-3xl">
                    <s.icon size={18} className="text-teal-600 dark:text-teal-500" />
                    {s.value}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* ---------- Filter bar ---------- */}
          <div className="sticky top-[68px] z-30 -mx-6 mt-12 border-y border-ink/10 bg-paper/85 px-6 py-4 backdrop-blur-xl dark:border-mist/10 dark:bg-void/85">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[16rem] flex-1">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-mist/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search 93 lectures — FIFO, EOQ, depreciation, cash flows…"
                  aria-label="Search lectures"
                  className="w-full rounded-full border border-ink/12 bg-transparent py-2.5 pl-11 pr-10 text-sm
                             outline-none transition-colors placeholder:text-ink/35 focus:border-teal-500
                             dark:border-mist/15 dark:placeholder:text-mist/35"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink dark:text-mist/40"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {(["All", ...TIERS] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors
                      ${tier === t
                        ? "bg-ink text-paper dark:bg-mist dark:text-void"
                        : "bg-ink/5 hover:bg-ink/10 dark:bg-mist/10 dark:hover:bg-mist/20"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {isSearching && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                {matchCount} lecture{matchCount === 1 ? "" : "s"} in {results.length} course
                {results.length === 1 ? "" : "s"}
              </p>
            )}
          </div>

          {/* ---------- Curriculum ---------- */}
          <div className="mt-12 space-y-4">
            {results.map(({ course, videos }, i) => {
              const expanded = isSearching || open === course.courseId;
              return (
                <motion.article
                  key={course.courseId}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: Math.min(i, 4) * 0.05, duration: 0.55, ease }}
                  className="overflow-hidden rounded-2xl border border-ink/10 transition-colors
                             hover:border-ink/25 dark:border-mist/10 dark:hover:border-mist/25"
                >
                  <button
                    onClick={() => setOpen(expanded && !isSearching ? null : course.courseId)}
                    aria-expanded={expanded}
                    className="flex w-full items-start gap-5 p-6 text-left sm:p-8"
                  >
                    <span className="hidden shrink-0 font-display text-4xl text-ink/15 sm:block dark:text-mist/15">
                      {String(course.order).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest dark:bg-mist/10">
                          {course.courseCode}
                        </span>
                        <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${tierStyle[course.tier]}`}>
                          {course.tier}
                        </span>
                      </span>

                      <span className="mt-3 block font-display text-2xl leading-snug md:text-3xl">
                        {course.title}
                      </span>
                      <span className="mt-2.5 block max-w-2xl text-sm leading-relaxed text-ink/65 dark:text-mist/65">
                        {course.description}
                      </span>

                      <span className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                        <span className="flex items-center gap-1.5"><BookOpen size={13} />{course.lectureCount} lectures</span>
                        <span className="flex items-center gap-1.5"><Clock size={13} />{course.totalDuration}</span>
                      </span>
                    </span>

                    <ChevronDown
                      size={20}
                      className={`mt-1 shrink-0 text-ink/40 transition-transform duration-300 dark:text-mist/40
                                 ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-ink/10 px-6 py-6 sm:px-8 dark:border-mist/10">
                          <ul className="flex flex-wrap gap-1.5">
                            {course.syllabusHighlights.map((h) => (
                              <li key={h} className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] dark:bg-mist/10">
                                {h}
                              </li>
                            ))}
                          </ul>

                          <ol className="mt-6 divide-y divide-ink/8 dark:divide-mist/8">
                            {videos.map((v) => {
                              const n = course.videos.findIndex((x) => x.id === v.id) + 1;
                              return (
                                <li key={v.id}>
                                  <button
                                    onClick={() => setPlaying({ course, video: v })}
                                    className="group flex w-full items-center gap-4 py-3.5 text-left"
                                  >
                                    <span className="w-6 shrink-0 font-mono text-[11px] text-ink/35 dark:text-mist/35">
                                      {String(n).padStart(2, "0")}
                                    </span>
                                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/5
                                                     text-ink/60 transition-colors group-hover:bg-teal-500
                                                     group-hover:text-white dark:bg-mist/10 dark:text-mist/60">
                                      <Play size={13} className="translate-x-px" fill="currentColor" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate text-[15px] transition-colors group-hover:text-teal-600">
                                        {v.title}
                                      </span>
                                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-ink/40 dark:text-mist/40">
                                        {v.topicTag}
                                      </span>
                                    </span>
                                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink/45 dark:text-mist/45">
                                      {v.duration}
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ol>

                          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5 text-xs dark:border-mist/10">
                            <Link href={`/lectures/${course.courseId}`} className="transition-colors hover:text-teal-600">
                              Open course page →
                            </Link>
                            <button
                              onClick={() => setPlaying({ course, video: course.videos[0] })}
                              className="text-ink/55 transition-colors hover:text-teal-600 dark:text-mist/55"
                            >
                              Start from lecture 01 ▶
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}

            {results.length === 0 && (
              <p className="rounded-2xl border border-dashed border-ink/15 p-12 text-center text-ink/55 dark:border-mist/15 dark:text-mist/55">
                Nothing matches “{query}”. Try “EOQ”, “FIFO”, “depreciation” or “ratio”.
              </p>
            )}
          </div>

          {/* ---------- Channel CTA ---------- */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-ink/5 p-8 md:p-10 dark:bg-mist/5">
            <div>
              <h2 className="font-display text-2xl">New lectures land on YouTube first</h2>
              <p className="mt-2 text-ink/65 dark:text-mist/65">
                Subscribe to be notified, or book office hours if a topic still isn&apos;t clicking.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#FF0000] px-6 py-3 text-sm font-medium text-white
                           transition-transform hover:-translate-y-0.5"
              >
                <MonitorPlay size={16} /> Subscribe
              </a>
              <Link
                href="/#booking"
                className="rounded-full border border-ink/15 px-6 py-3 text-sm transition-colors
                           hover:border-ink/40 hover:bg-ink/5 dark:border-mist/20 dark:hover:border-mist/50 dark:hover:bg-mist/10"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LecturePlayer
        course={playing?.course ?? null}
        video={playing?.video ?? null}
        onClose={() => setPlaying(null)}
        onSelect={(video) => setPlaying((p) => (p ? { ...p, video } : p))}
      />
    </>
  );
}
