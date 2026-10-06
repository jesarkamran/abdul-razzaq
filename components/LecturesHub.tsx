"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BookOpen, ChevronDown, Clock, GraduationCap, Layers, MonitorPlay, Play, Search, X,
} from "lucide-react";
import LecturePlayer from "./LecturePlayer";
import {
  ACADEMIC_COURSES, TIERS, TOTAL_LECTURES, TOTAL_RUNTIME,
  type AcademicCourse, type CourseTier, type VideoRecord,
} from "@/data/coursesData";
import { profile } from "@/lib/data";

const tierStyle: Record<CourseTier, string> = {
  Beginner: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/25 dark:text-emerald-400",
  Intermediate: "bg-amber-500/12 text-amber-700 ring-amber-500/25 dark:text-amber-400",
  Advanced: "bg-rose-500/12 text-rose-700 ring-rose-500/25 dark:text-rose-400",
};

const tierBar: Record<CourseTier, string> = {
  Beginner: "bg-emerald-500",
  Intermediate: "bg-amber-500",
  Advanced: "bg-rose-500",
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function LecturesHub() {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<CourseTier | "All">("All");
  const [open, setOpen] = useState<string | null>(ACADEMIC_COURSES[0].courseId);
  const [playing, setPlaying] = useState<{ course: AcademicCourse; video: VideoRecord } | null>(null);
  const uid = useId();

  const q = query.trim().toLowerCase();

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
      <section aria-labelledby={`${uid}-title`} className="px-5 pt-32 pb-28 sm:px-6 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              Lectures & Courses
            </p>
            <h1
              id={`${uid}-title`}
              className="mt-3 max-w-3xl font-display text-[clamp(2.25rem,8vw,3.75rem)] leading-[1.05] tracking-tight text-balance"
            >
              A full curriculum, in the order you should watch it
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65 dark:text-mist/65">
              {TOTAL_LECTURES} recorded lectures across eight courses — from double-entry
              bookkeeping through to ratio analysis and capital markets. Each course builds
              on the one before it.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/10 pt-7 sm:flex sm:flex-wrap sm:gap-12 dark:border-mist/10">
              {[
                { icon: Layers, value: ACADEMIC_COURSES.length, label: "Courses" },
                { icon: BookOpen, value: TOTAL_LECTURES, label: "Lectures" },
                { icon: Clock, value: TOTAL_RUNTIME, label: "Total runtime" },
                { icon: GraduationCap, value: "4", label: "Progression levels" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease }}
                  className="flex flex-col-reverse"
                >
                  <dt className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                    {s.label}
                  </dt>
                  <dd className="flex items-center gap-2 font-display text-3xl tabular-nums">
                    <s.icon size={18} aria-hidden className="text-accent-600 dark:text-accent-400" />
                    {s.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.header>

          <div className="sticky top-[68px] z-30 -mx-5 mt-12 border-y border-ink/10 bg-paper/85 px-5 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 dark:border-mist/10 dark:bg-void/85">
            <div className="flex flex-wrap items-center gap-3">
              <form role="search" onSubmit={(e) => e.preventDefault()} className="relative min-w-[min(16rem,100%)] flex-1">
                <label htmlFor={`${uid}-search`} className="sr-only">
                  Search lectures
                </label>
                <Search
                  size={15}
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-mist/40"
                />
                <input
                  id={`${uid}-search`}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && setQuery("")}
                  placeholder={`Search ${TOTAL_LECTURES} lectures — FIFO, EOQ, depreciation, cash flows…`}
                  autoComplete="off"
                  aria-describedby={`${uid}-status`}
                  className="w-full appearance-none rounded-full border border-ink/12 bg-paper/60 py-2.5 pl-11 pr-10 text-sm
                             outline-none transition-[border-color,box-shadow] placeholder:text-ink/40
                             focus:border-accent-500 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent-500)_18%,transparent)]
                             dark:border-mist/15 dark:bg-void/60 dark:placeholder:text-mist/40
                             [&::-webkit-search-cancel-button]:hidden"
                />
                <AnimatePresence>
                  {query && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full
                                 text-ink/50 hover:bg-ink/5 hover:text-ink dark:text-mist/50 dark:hover:bg-mist/10 dark:hover:text-mist"
                    >
                      <X size={14} aria-hidden />
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>

              <div role="group" aria-label="Filter by level" className="flex flex-wrap gap-1.5">
                {(["All", ...TIERS] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTier(t)}
                    aria-pressed={tier === t}
                    className={`relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors duration-300
                      ${tier === t
                        ? "text-paper dark:text-void"
                        : "bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink dark:bg-mist/10 dark:text-mist/70 dark:hover:bg-mist/20 dark:hover:text-mist"}`}
                  >
                    {tier === t && (
                      <motion.span
                        layoutId={`${uid}-tier`}
                        aria-hidden
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 -z-10 rounded-full bg-ink dark:bg-mist"
                      />
                    )}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <p
              id={`${uid}-status`}
              role="status"
              aria-live="polite"
              className="font-mono text-[11px] uppercase tracking-widest text-ink/50 empty:hidden dark:text-mist/50 [&:not(:empty)]:mt-3"
            >
              {isSearching
                ? `${matchCount} lecture${matchCount === 1 ? "" : "s"} in ${results.length} course${results.length === 1 ? "" : "s"}`
                : ""}
            </p>
          </div>

          <div className="relative isolate mt-12 space-y-4">
            <AnimatePresence initial={false} mode="popLayout">
              {results.map(({ course, videos }, i) => {
                const expanded = isSearching || open === course.courseId;
                const headId = `${uid}-${course.courseId}-head`;
                const panelId = `${uid}-${course.courseId}-panel`;
                return (
                  <motion.article
                    key={course.courseId}
                    layout="position"
                    aria-labelledby={headId}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: Math.min(i, 4) * 0.05, duration: 0.55, ease }}
                    className={`group/course relative overflow-hidden rounded-2xl border transition-[border-color,box-shadow,background-color] duration-300
                      ${expanded
                        ? "border-ink/20 bg-paper/70 shadow-[0_18px_50px_-30px_rgba(0,0,0,.35)] dark:border-mist/20 dark:bg-mist/[0.03]"
                        : "border-ink/10 hover:border-ink/25 hover:bg-paper/50 dark:border-mist/10 dark:hover:border-mist/25 dark:hover:bg-mist/[0.02]"}`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-1 origin-top transition-transform duration-500
                        ${tierBar[course.tier]} ${expanded ? "scale-y-100" : "scale-y-0 group-hover/course:scale-y-100"}`}
                    />

                    <h2 className="m-0">
                      <button
                        id={headId}
                        type="button"
                        onClick={() => setOpen(expanded && !isSearching ? null : course.courseId)}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        className="flex w-full items-start gap-5 p-6 text-left outline-offset-[-3px] sm:p-8"
                      >
                        <span
                          aria-hidden
                          className={`hidden w-14 shrink-0 font-display text-4xl tabular-nums transition-colors duration-300 sm:block
                            ${expanded ? "text-accent-600/70 dark:text-accent-400/70" : "text-ink/15 group-hover/course:text-ink/30 dark:text-mist/15 dark:group-hover/course:text-mist/30"}`}
                        >
                          {String(course.order).padStart(2, "0")}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest dark:bg-mist/10">
                              {course.courseCode}
                            </span>
                            <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ring-1 ring-inset ${tierStyle[course.tier]}`}>
                              {course.tier}
                            </span>
                          </span>

                          <span className="mt-3 block font-display text-2xl leading-snug text-balance md:text-3xl">
                            {course.title}
                          </span>
                          <span className="mt-2.5 block max-w-2xl text-sm font-normal leading-relaxed text-ink/65 dark:text-mist/65">
                            {course.description}
                          </span>

                          <span className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] font-normal uppercase tracking-widest text-ink/50 dark:text-mist/50">
                            <span className="flex items-center gap-1.5"><BookOpen size={13} aria-hidden />{course.lectureCount} lectures</span>
                            <span className="flex items-center gap-1.5"><Clock size={13} aria-hidden />{course.totalDuration}</span>
                          </span>
                        </span>

                        <span
                          aria-hidden
                          className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300
                            ${expanded
                              ? "rotate-180 border-accent-500 bg-accent-500 text-white"
                              : "border-ink/12 text-ink/50 group-hover/course:border-ink/30 group-hover/course:text-ink dark:border-mist/15 dark:text-mist/50 dark:group-hover/course:text-mist"}`}
                        >
                          <ChevronDown size={17} />
                        </span>
                      </button>
                    </h2>

                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={headId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-ink/10 px-6 py-6 sm:px-8 dark:border-mist/10">
                            <h3 className="sr-only">Syllabus highlights</h3>
                            <ul className="flex flex-wrap gap-1.5">
                              {course.syllabusHighlights.map((h) => (
                                <li key={h} className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] dark:bg-mist/10">
                                  {h}
                                </li>
                              ))}
                            </ul>

                            <h3 className="sr-only">Lectures</h3>
                            <ol className="mt-6 divide-y divide-ink/8 dark:divide-mist/8">
                              {videos.map((v, j) => {
                                const n = course.videos.findIndex((x) => x.id === v.id) + 1;
                                return (
                                  <motion.li
                                    key={v.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: Math.min(j, 10) * 0.025, duration: 0.3, ease }}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => setPlaying({ course, video: v })}
                                      aria-label={`Play lecture ${n}: ${v.title}, ${v.topicTag}, ${v.duration}`}
                                      className="group -mx-3 flex w-[calc(100%+1.5rem)] items-center gap-4 rounded-xl px-3 py-3.5 text-left
                                                 transition-colors hover:bg-ink/[0.04] dark:hover:bg-mist/[0.05]"
                                    >
                                      <span className="w-6 shrink-0 font-mono text-[11px] tabular-nums text-ink/40 dark:text-mist/40">
                                        {String(n).padStart(2, "0")}
                                      </span>
                                      <span
                                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/5 text-ink/60
                                                   transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white
                                                   group-focus-visible:bg-accent-500 group-focus-visible:text-white dark:bg-mist/10 dark:text-mist/60"
                                      >
                                        <Play size={13} className="translate-x-px" fill="currentColor" aria-hidden />
                                      </span>
                                      <span className="min-w-0 flex-1">
                                        <span className="block truncate text-[15px] transition-colors group-hover:text-accent-700 dark:group-hover:text-accent-400">
                                          {v.title}
                                        </span>
                                        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                                          {v.topicTag}
                                        </span>
                                      </span>
                                      <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink/50 dark:text-mist/50">
                                        {v.duration}
                                      </span>
                                    </button>
                                  </motion.li>
                                );
                              })}
                            </ol>

                            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5 text-sm dark:border-mist/10">
                              <Link
                                href={`/lectures/${course.courseId}`}
                                className="group/link inline-flex items-center gap-1.5 rounded-full font-medium transition-colors hover:text-accent-700 dark:hover:text-accent-400"
                              >
                                Open course page<span className="sr-only">: {course.title}</span>
                                <ArrowRight size={14} aria-hidden className="transition-transform group-hover/link:translate-x-1" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => setPlaying({ course, video: course.videos[0] })}
                                className="inline-flex items-center gap-1.5 rounded-full text-ink/60 transition-colors hover:text-accent-700 dark:text-mist/60 dark:hover:text-accent-400"
                              >
                                <Play size={12} fill="currentColor" aria-hidden />
                                Start from lecture 01<span className="sr-only"> of {course.title}</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            {results.length === 0 && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-dashed border-ink/15 p-12 text-center text-ink/60 dark:border-mist/15 dark:text-mist/60"
              >
                Nothing matches “{query}”. Try “EOQ”, “FIFO”, “depreciation” or “ratio”.
              </motion.p>
            )}
          </div>

          <aside
            aria-labelledby={`${uid}-cta`}
            className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-ink/5 p-8 md:p-10 dark:bg-mist/5"
          >
            <div>
              <h2 id={`${uid}-cta`} className="font-display text-2xl">New lectures land on YouTube first</h2>
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
                <MonitorPlay size={16} aria-hidden /> Subscribe<span className="sr-only"> on YouTube (opens in a new tab)</span>
              </a>
              <Link
                href="/#booking"
                className="rounded-full border border-ink/15 px-6 py-3 text-sm transition-colors
                           hover:border-ink/40 hover:bg-ink/5 dark:border-mist/20 dark:hover:border-mist/50 dark:hover:bg-mist/10"
              >
                Book a Session
              </Link>
            </div>
          </aside>
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
