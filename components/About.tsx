"use client";

import {
  Building2,
  GraduationCap,
  Mail,
  Globe,
  Briefcase,
  BookMarked,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { profile, researchAreas } from "@/lib/data";
import { Reveal, SectionHeader, Spotlight } from "./ui";

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
    <section id="about" aria-labelledby="about-title" className="px-5 py-24 sm:px-6 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              index="01"
              eyebrow="Academic Profile"
              id="about-title"
              title="Teaching, and the research behind it"
            />
            <Reveal i={1}>
              <h3 className="mt-10 font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                Research areas
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {researchAreas.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-ink/10 bg-paper/60 px-3.5 py-1.5 text-[13px] transition-colors duration-300
                               hover:border-accent-500/40 hover:text-accent-600 dark:border-mist/10 dark:bg-mist/5 dark:hover:text-accent-400"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="space-y-5 lg:col-span-7">
          <Reveal>
            <Spotlight className="card p-7 sm:p-10">
              <p className="font-display text-2xl leading-snug text-balance sm:text-[1.75rem]">
                {profile.aboutLead}
              </p>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/70 dark:text-mist/70">
                <p>
                  {profile.aboutParagraph1}
                </p>
                <p>
                  {profile.aboutParagraph2}
                </p>
              </div>
            </Spotlight>
          </Reveal>

          <Reveal i={1}>
            <h3 className="sr-only">Contact and profiles</h3>
            <ul role="list" className="grid gap-3 sm:grid-cols-2">
              {facts.map(({ label, value, href, Icon }) => (
                <li key={label}>
                <Spotlight className="card group flex h-full items-start gap-4 p-5">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-600
                               transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white dark:text-accent-400"
                  >
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">{label}</p>
                    <p className="mt-1 text-sm leading-snug break-words">
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 outline-none transition-colors after:absolute after:inset-0
                                     after:rounded-[inherit] hover:text-accent-600 dark:hover:text-accent-400"
                        >
                          {value}
                          {href.startsWith("http") && (
                            <>
                              <ArrowUpRight size={12} aria-hidden className="opacity-50" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </>
                          )}
                        </a>
                      ) : (
                        value
                      )}
                    </p>
                  </div>
                </Spotlight>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
