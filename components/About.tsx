"use client";

import {
  Building2,
  GraduationCap,
  Mail,
  Globe,
  Briefcase,
  BookMarked,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { profile, researchAreas } from "@/lib/data";
import { Reveal, Spotlight } from "./ui";

// Swap any icon here for another Lucide glyph — nothing else depends on it.
const facts: { label: string; value: string; href?: string; Icon: LucideIcon }[] = [
  { label: "Position", value: `${profile.role}, ${profile.school}`, Icon: GraduationCap },
  { label: "University", value: profile.university, Icon: Building2 },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "Faculty Profile", value: "qau.edu.pk", href: profile.links.qau, Icon: Globe },
  { label: "LinkedIn", value: "abdul-razzaq", href: profile.links.linkedin, Icon: Briefcase },
  { label: "ResearchGate", value: "Abdul-Razzaq-7", href: profile.links.researchgate, Icon: BookMarked },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Academic Profile
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
            Teaching, and the research behind it
          </h2>
        </Reveal>

        {/* Bento: wide bio card, a research-areas card, a contact card. */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Reveal i={0} className="md:col-span-2">
            <Spotlight className="card h-full p-8 md:p-10">
              <div className="space-y-5 text-lg leading-relaxed text-ink/70 dark:text-mist/70">
                <p>
                  I teach financial management, cost and management accounting, and financial
                  markets at the {profile.school}, {profile.university}. Most of my classroom
                  work is now recorded and published openly, so students can work through the
                  numericals again at their own pace.
                </p>
                <p>
                  My research sits where finance meets development and the environment: how
                  digital financial services reach households the formal sector has missed, what
                  drives fintech adoption, and whether green innovation and clean energy actually
                  decouple growth from ecological damage.
                </p>
              </div>
            </Spotlight>
          </Reveal>

          <Reveal i={1}>
            <Spotlight className="card h-full p-8">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                <Sparkles size={13} className="text-teal-500" /> Research Areas
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {researchAreas.map((a) => (
                  <li
                    key={a}
                    className="cursor-default rounded-full border border-ink/8 bg-ink/5 px-3.5 py-1.5 font-mono text-[11px]
                               transition-transform duration-300 hover:scale-105 hover:border-teal-500/40
                               hover:text-teal-600 dark:border-mist/10 dark:bg-mist/10 dark:hover:text-teal-400"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>

          <Reveal i={2} className="md:col-span-3">
            <Spotlight className="card p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                Contact & Profiles
              </p>
              <dl className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {facts.map(({ label, value, href, Icon }) => (
                  <div key={label} className="group flex gap-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-500/10
                                     text-teal-600 transition-colors group-hover:bg-teal-500/20 dark:text-teal-400">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                        {label}
                      </dt>
                      <dd className="mt-1 truncate text-sm leading-snug">
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="underline decoration-ink/20 underline-offset-4 transition-colors
                                       hover:text-teal-600 hover:decoration-teal-600 dark:decoration-mist/20"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
