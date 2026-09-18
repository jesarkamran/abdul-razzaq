"use client";

import { motion } from "framer-motion";
import { profile, researchAreas } from "@/lib/data";

const facts = [
  { label: "Position", value: `${profile.role}, ${profile.school}` },
  { label: "University", value: profile.university },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Faculty Profile", value: "qau.edu.pk", href: profile.links.qau },
  { label: "LinkedIn", value: "abdul-razzaq", href: profile.links.linkedin },
  { label: "ResearchGate", value: "Abdul-Razzaq-7", href: profile.links.researchgate },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.2fr_0.8fr]"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-500">
            Academic Profile
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Teaching, and the research behind it
          </h2>

          <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink/70 dark:text-mist/70">
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

          <ul className="mt-8 flex flex-wrap gap-2">
            {researchAreas.map((a) => (
              <li key={a} className="rounded-full bg-ink/5 px-3.5 py-1.5 font-mono text-[11px] dark:bg-mist/10">
                {a}
              </li>
            ))}
          </ul>
        </div>

        <dl className="space-y-6 border-t border-ink/10 pt-8 text-sm md:border-t-0 md:border-l md:pt-0 md:pl-10 dark:border-mist/10">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/45 dark:text-mist/45">
                {f.label}
              </dt>
              <dd className="mt-1.5 leading-snug">
                {f.href ? (
                  <a
                    href={f.href}
                    target={f.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="underline decoration-ink/20 underline-offset-4 transition-colors
                               hover:text-teal-600 hover:decoration-teal-600 dark:decoration-mist/20"
                  >
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
