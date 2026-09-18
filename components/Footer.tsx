import Link from "next/link";
import { profile } from "@/lib/data";
import { ACADEMIC_COURSES } from "@/data/coursesData";

const socials = [
  { label: "YouTube", href: profile.links.youtube },
  { label: "ResearchGate", href: profile.links.researchgate },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "QAU Profile", href: profile.links.qau },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-14 dark:border-mist/10">
      <div className="mx-auto grid max-w-6xl gap-10 text-sm md:grid-cols-3">
        <div>
          <p className="font-display text-xl">{profile.name}</p>
          <p className="mt-2 leading-relaxed text-ink/55 dark:text-mist/55">
            {profile.role}<br />{profile.school}<br />{profile.university}
          </p>
        </div>

        <nav>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">Courses</p>
          <ul className="mt-4 space-y-2">
            {ACADEMIC_COURSES.slice(0, 5).map((c) => (
              <li key={c.courseId}>
                <Link
                  href={`/lectures/${c.courseId}`}
                  className="text-ink/70 transition-colors hover:text-teal-600 dark:text-mist/70"
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
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer"
                   className="text-ink/70 transition-colors hover:text-teal-600 dark:text-mist/70">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mx-auto mt-12 max-w-6xl font-mono text-[10px] uppercase tracking-widest text-ink/35 dark:text-mist/35">
        © {new Date().getFullYear()} {profile.name} · Quaid-i-Azam University
      </p>
    </footer>
  );
}
