import Link from "next/link";
import { ArrowRight, MonitorPlay } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import CourseGrid from "@/components/CourseGrid";
import Booking from "@/components/Booking";
import { profile } from "@/lib/data";
import { ACADEMIC_COURSES, TOTAL_LECTURES, TOTAL_RUNTIME } from "@/data/coursesData";
import { Reveal, Magnetic } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Research />

      <section id="lectures" className="px-5 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                Lectures & Courses
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,8vw,2.25rem)] tracking-tight md:text-5xl">
                The curriculum, in order
              </h2>
              <p className="mt-4 max-w-xl text-ink/65 dark:text-mist/65">
                {TOTAL_LECTURES} recorded lectures · {TOTAL_RUNTIME} · {ACADEMIC_COURSES.length} courses,
                sequenced from foundational bookkeeping through to advanced financial analysis.
              </p>
            </div>
            <Magnetic strength={0.2}>
              <a
                href={profile.links.youtube}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-6 py-3 text-sm font-medium text-white
                           shadow-lg shadow-red-500/25 transition-transform duration-300 hover:scale-[1.04]"
              >
                <MonitorPlay size={16} /> Subscribe on YouTube
              </a>
            </Magnetic>
          </Reveal>

          <div className="mt-12">
            <CourseGrid />
          </div>

          <div className="mt-12">
            <Magnetic strength={0.2}>
              <Link
                href="/lectures"
                className="glow-btn group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm
                           font-medium text-paper transition-transform duration-300 hover:scale-[1.03]
                           dark:bg-mist dark:text-void"
              >
                Browse all {TOTAL_LECTURES} lectures
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      <Booking />
    </>
  );
}
