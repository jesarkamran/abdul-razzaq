import Link from "next/link";
import { ArrowRight, MonitorPlay } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import CourseGrid from "@/components/CourseGrid";
import Booking from "@/components/Booking";
import { profile } from "@/lib/data";
import { ACADEMIC_COURSES, TOTAL_LECTURES, TOTAL_RUNTIME } from "@/data/coursesData";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Research />

      <section id="lectures" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-500">
                Lectures & Courses
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
                The curriculum, in order
              </h2>
              <p className="mt-4 max-w-xl text-ink/65 dark:text-mist/65">
                {TOTAL_LECTURES} recorded lectures · {TOTAL_RUNTIME} · {ACADEMIC_COURSES.length} courses,
                sequenced from foundational bookkeeping through to advanced financial analysis.
              </p>
            </div>
            <a
              href={profile.links.youtube}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#FF0000] px-6 py-3 text-sm font-medium text-white
                         transition-transform hover:-translate-y-0.5"
            >
              <MonitorPlay size={16} /> Subscribe on YouTube
            </a>
          </div>

          <div className="mt-12">
            <CourseGrid />
          </div>

          <Link
            href="/lectures"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium
                       text-paper transition-transform hover:-translate-y-0.5 dark:bg-mist dark:text-void"
          >
            Browse all {TOTAL_LECTURES} lectures
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Booking />
    </>
  );
}
