import Link from "next/link";
import { ArrowRight, MonitorPlay } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import CourseGrid from "@/components/CourseGrid";
import Booking from "@/components/Booking";
import { profile } from "@/lib/data";
import { ACADEMIC_COURSES, TOTAL_LECTURES, TOTAL_RUNTIME } from "@/data/coursesData";
import { Magnetic, SectionHeader } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Research />

      <section id="lectures" aria-labelledby="lectures-title" className="px-5 py-24 sm:px-6 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="03"
            eyebrow="Lectures & Courses"
            id="lectures-title"
            title="The curriculum, in order"
            lede={`${TOTAL_LECTURES} recorded lectures · ${TOTAL_RUNTIME} · ${ACADEMIC_COURSES.length} courses, sequenced from foundational bookkeeping through to advanced financial analysis.`}
            action={
              <Magnetic strength={0.2}>
                <a
                  href={profile.links.youtube}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-6 py-3 text-sm font-medium text-white
                             shadow-lg shadow-red-500/25 transition-transform duration-300 hover:scale-[1.04]"
                >
                  <MonitorPlay size={16} aria-hidden /> Subscribe on YouTube<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Magnetic>
            }
          />

          <div className="mt-14">
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
                <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      <Booking />
    </>
  );
}
