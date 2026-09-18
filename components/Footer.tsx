import Link from "next/link";
import { MonitorPlay, BookMarked, Briefcase, Building2, ArrowUpRight, type LucideIcon } from "lucide-react";
import { profile } from "@/lib/data";
import { ACADEMIC_COURSES } from "@/data/coursesData";

const socials: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "YouTube", href: profile.links.youtube, Icon: MonitorPlay },
  { label: "ResearchGate", href: profile.links.researchgate, Icon: BookMarked },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: Briefcase },
  { label: "QAU Profile", href: profile.links.qau, Icon: Building2 },
];

export default function Footer() {
  return (
    <footer className="relative mt-10 px-5 pb-14 pt-16 sm:px-6">
      {/* Animated gradient hairline along the top edge */}
      <div aria-hidden className="gradient-rule absolute inset-x-0 top-0" />

      <div className="mx-auto grid max-w-6xl gap-12 text-sm md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{profile.name}</p>
          <p className="mt-3 leading-relaxed text-ink/55 dark:text-mist/55">
            {profile.role}
            <br />
            {profile.school}
            <br />
            {profile.university}
          </p>
        </div>

        <nav>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">Courses</p>
          <ul className="mt-5 space-y-2.5">
            {ACADEMIC_COURSES.slice(0, 5).map((c) => (
              <li key={c.courseId}>
                <Link
                  href={`/lectures/${c.courseId}`}
                  className="text-ink/60 transition-colors hover:text-teal-600 dark:text-mist/60 dark:hover:text-teal-400"
                >
                  <span className="font-mono text-[10px] text-ink/40 dark:text-mist/40">{c.courseCode}</span>{" "}
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">Elsewhere</p>
          <ul className="mt-5 space-y-2.5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-ink/60 transition-colors
                             hover:text-teal-600 dark:text-mist/60 dark:hover:text-teal-400"
                >
                  <Icon size={15} className="opacity-60 transition-opacity group-hover:opacity-100" />
                  {label}
                  <ArrowUpRight size={12} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mx-auto mt-14 max-w-6xl font-mono text-[10px] uppercase tracking-widest text-ink/35 dark:text-mist/35">
        © {new Date().getFullYear()} {profile.name} · Quaid-i-Azam University
      </p>
    </footer>
  );
}
