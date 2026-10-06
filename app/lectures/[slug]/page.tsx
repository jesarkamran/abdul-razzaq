import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import CourseLectureList from "@/components/CourseLectureList";
import CourseGrid from "@/components/CourseGrid";
import { profile, publications } from "@/lib/data";
import { ACADEMIC_COURSES, courseById, type CourseTier } from "@/data/coursesData";

const tierStyle: Record<CourseTier, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Advanced: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
};

export function generateStaticParams() {
  return ACADEMIC_COURSES.map((c) => ({ slug: c.courseId }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = courseById(slug);
  if (!course) return {};
  return {
    title: `${course.courseCode} · ${course.title} — ${profile.name}`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courseById(slug);
  if (!course) notFound();

  const i = ACADEMIC_COURSES.findIndex((c) => c.courseId === slug);
  const prev = ACADEMIC_COURSES[i - 1];
  const next = ACADEMIC_COURSES[i + 1];
  const related = publications.filter((p) => p.courseId === slug);

  return (
    <div className="px-6 pt-36 pb-28">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb">
        <Link
          href="/lectures"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink/45
                     transition-colors hover:text-accent-600 dark:text-mist/45"
        >
          <ArrowLeft size={13} aria-hidden /> All courses
        </Link>
        </nav>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest dark:bg-mist/10">
            {course.courseCode}
          </span>
          <span className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${tierStyle[course.tier]}`}>
            {course.tier}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
            Course {course.order} of {ACADEMIC_COURSES.length}
          </span>
        </div>

        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
          {course.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65 dark:text-mist/65">
          {course.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
          <span className="flex items-center gap-1.5"><BookOpen size={13} aria-hidden />{course.lectureCount} lectures</span>
          <span className="flex items-center gap-1.5"><Clock size={13} aria-hidden />{course.totalDuration}</span>
        </div>

        <ul aria-label="Syllabus highlights" className="mt-8 flex flex-wrap gap-2">
          {course.syllabusHighlights.map((h) => (
            <li key={h} className="rounded-full bg-ink/5 px-3.5 py-1.5 font-mono text-[11px] dark:bg-mist/10">
              {h}
            </li>
          ))}
        </ul>

        <section aria-label="Lectures" className="mt-14">
          <CourseLectureList course={course} />
        </section>

        <nav aria-label="Course sequence" className="mt-20 grid gap-4 sm:grid-cols-2">
          {[prev, next].map((c, idx) =>
            c ? (
              <Link
                key={c.courseId}
                href={`/lectures/${c.courseId}`}
                rel={idx === 0 ? "prev" : "next"}
                className={`group rounded-2xl border border-ink/10 p-6 transition-all duration-300 hover:-translate-y-1
                           hover:border-accent-500/50 focus-visible:-translate-y-1 dark:border-mist/10 dark:hover:border-mist/25
                           ${idx === 1 ? "sm:text-right" : ""}`}
              >
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45"
                      style={idx === 1 ? { justifyContent: "flex-end" } : undefined}>
                  {idx === 0 ? <><ArrowLeft size={12} aria-hidden /> Previous course</> : <>Next course <ArrowRight size={12} aria-hidden /></>}
                </span>
                <span className="mt-2.5 block font-display text-xl leading-snug transition-colors group-hover:text-accent-700 dark:group-hover:text-accent-400">{c.title}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-accent-600 dark:text-accent-400">
                  {c.courseCode} · {c.lectureCount} lectures
                </span>
              </Link>
            ) : (
              <span key={idx} />
            )
          )}
        </nav>

        {related.length > 0 && (
          <section className="mt-20 rounded-3xl border border-ink/10 p-8 md:p-10 dark:border-mist/10">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent-600 dark:text-accent-400">
              From the research
            </p>
            <h2 className="mt-3 font-display text-2xl">Papers that build on this course</h2>
            <ul className="mt-6 divide-y divide-ink/10 dark:divide-mist/10">
              {related.map((p) => (
                <li key={p.title} className="py-4 first:pt-0 last:pb-0">
                  <a
                    href={profile.links.researchgate}
                    target="_blank" rel="noopener noreferrer"
                    className="group flex flex-wrap items-baseline justify-between gap-2"
                  >
                    <span className="transition-colors group-hover:text-accent-600">{p.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                      {p.year} · {p.venue} <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-20">
          <h2 className="font-display text-3xl">Other courses</h2>
          <div className="mt-8">
            <CourseGrid exclude={slug} limit={4} />
          </div>
        </section>

        <section className="mt-20 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-ink/5 p-8 md:p-10 dark:bg-mist/5">
          <div>
            <h2 className="font-display text-2xl">Stuck on {course.courseCode}?</h2>
            <p className="mt-2 text-ink/65 dark:text-mist/65">Book office hours and we&apos;ll work through it.</p>
          </div>
          <Link
            href="/#booking"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper
                       transition-transform hover:-translate-y-0.5 dark:bg-mist dark:text-void"
          >
            Book a Session <span aria-hidden>→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
