"use client";

import Script from "next/script";
import { Mail, Phone, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal, SectionHeader } from "./ui";

const contacts = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
    Icon: Phone,
  },
];

const topics = ["Thesis supervision", "Methods troubleshooting", "Research collaboration"];

export default function Booking() {
  return (
    <section id="booking" aria-labelledby="booking-title" className="relative px-5 py-24 sm:px-6 md:py-32">
      <div
        className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-ink/10 bg-paper/70
                   p-5 shadow-[0_40px_120px_-60px_rgba(0,0,0,.5)] sm:p-8 lg:p-12 dark:border-mist/10 dark:bg-mist/[0.03]"
      >
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-glow-400/20 blur-3xl" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              index="04"
              eyebrow="Office Hours"
              id="booking-title"
              title="Book a 1-on-1"
              lede="Pick a slot and you'll get a calendar invite with the meeting link."
            />

            <Reveal i={1}>
              <h3 className="mt-10 font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                Good for
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <li key={t} className="rounded-full border border-ink/10 px-3.5 py-1.5 text-[13px] dark:border-mist/10">
                    {t}
                  </li>
                ))}
              </ul>

              <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10 dark:divide-mist/10 dark:border-mist/10">
                {contacts.map(({ label, value, href, Icon }) => (
                  <div key={label} className="flex items-center gap-4 py-4">
                    <dt className="flex w-24 shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                      <Icon size={14} aria-hidden className="text-accent-600 dark:text-accent-400" />
                      {label}
                    </dt>
                    <dd className="min-w-0 truncate text-sm">
                      <a className="transition-colors hover:text-accent-600 dark:hover:text-accent-400" href={href}>
                        {value}
                      </a>
                    </dd>
                  </div>
                ))}
                <div className="flex items-start gap-4 py-4">
                  <dt className="flex w-24 shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                    <MapPin size={14} aria-hidden className="text-accent-600 dark:text-accent-400" />
                    Office
                  </dt>
                  <dd className="text-sm leading-relaxed">
                    {profile.school}
                    <br />
                    {profile.university}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal i={1} className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-[0_30px_80px_-40px_rgba(0,0,0,.45)] dark:border-mist/10 dark:bg-void">
              <div
                className="calendly-inline-widget min-h-[720px]"
                title="Book office hours with Calendly"
                data-url={`${profile.links.calendly}?hide_gdpr_banner=1&primary_color=5b5af1`}
              />
              <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
              <noscript>
                <a href={profile.links.calendly}>Open the booking page</a>
              </noscript>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
