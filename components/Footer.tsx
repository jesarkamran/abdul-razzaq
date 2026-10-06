import Link from "next/link";
import {
  MonitorPlay, BookMarked, Briefcase, Building2, ArrowUpRight, ArrowRight, ArrowUp, type LucideIcon,
} from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { ACADEMIC_COURSES } from "@/data/coursesData";

const socials: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "YouTube", href: profile.links.youtube, Icon: MonitorPlay },
  { label: "ResearchGate", href: profile.links.researchgate, Icon: BookMarked },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: Briefcase },
  { label: "QAU Profile", href: profile.links.qau, Icon: Building2 },
];

const heading = "font-mono text-[10px] font-normal uppercase tracking-widest text-ink/50 dark:text-mist/50";
const link = "text-ink/65 transition-colors hover:text-accent-600 dark:text-mist/65 dark:hover:text-accent-400";

export default function Footer() {
  return (
    <footer className="relative mt-10 px-5 pb-10 pt-20 sm:px-6">
      <div aria-hidden className="gradient-rule absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 border-b border-ink/10 pb-14 md:flex-row md:items-end md:justify-between dark:border-mist/10">
          <p className="max-w-2xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] tracking-tight text-balance">
            Stuck on a lecture, or curious about a paper?{" "}
            <span className="text-gradient">Let&apos;s talk.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#booking"
              className="glow-btn group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium
                         text-paper transition-transform duration-300 hover:scale-[1.03] dark:bg-mist dark:text-void"
            >
              Book a Session
              <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="glass inline-flex items-center rounded-full px-7 py-3.5 text-sm transition-colors hover:border-accent-500/50"
            >
              Email
              <span className="sr-only"> {profile.email}</span>
            </a>
          </div>
        </div>

        <div className="grid gap-12 pt-14 text-sm sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-2xl">{profile.name}</p>
            <address className="mt-3 not-italic leading-relaxed text-ink/60 dark:text-mist/60">
              {profile.role}
              <br />
              {profile.school}
              <br />
              {profile.university}
            </address>
          </div>

          <nav aria-labelledby="footer-courses" className="lg:col-span-4">
            <h2 id="footer-courses" className={heading}>Courses</h2>
            <ul className="mt-5 space-y-2.5">
              {ACADEMIC_COURSES.slice(0, 5).map((c) => (
                <li key={c.courseId}>
                  <Link href={`/lectures/${c.courseId}`} className={link}>
                    <span className="font-mono text-[10px] text-ink/45 dark:text-mist/45">{c.courseCode}</span>{" "}
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/lectures" className="inline-flex items-center gap-1 font-medium text-accent-600 dark:text-accent-400">
                  All courses <ArrowRight size={12} aria-hidden />
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-site" className="lg:col-span-2">
            <h2 id="footer-site" className={heading}>Site</h2>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-elsewhere" className="lg:col-span-2">
            <h2 id="footer-elsewhere" className={heading}>Elsewhere</h2>
            <ul className="mt-5 space-y-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-2.5 ${link}`}>
                    <Icon size={15} aria-hidden className="opacity-60 transition-opacity group-hover:opacity-100" />
                    {label}
                    <ArrowUpRight
                      size={12}
                      aria-hidden
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 dark:border-mist/10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
            © {new Date().getFullYear()} {profile.name} · Quaid-i-Azam University
          </p>
          <a
            href="#main"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/50
                       transition-colors hover:text-accent-600 dark:text-mist/50 dark:hover:text-accent-400"
          >
            Back to top
            <ArrowUp size={12} aria-hidden className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
