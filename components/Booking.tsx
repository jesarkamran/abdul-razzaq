"use client";

import Script from "next/script";
import { Mail, Phone, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal, Spotlight } from "./ui";

const contacts = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
    Icon: Phone,
  },
];

export default function Booking() {
  return (
    <section id="booking" className="relative px-5 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Office Hours
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,8vw,2.25rem)] tracking-tight md:text-5xl">
            Book a 1-on-1
          </h2>
          <p className="mt-5 text-ink/70 dark:text-mist/70">
            Thesis supervision, methods troubleshooting, or a research collaboration.
            Pick a slot and you&apos;ll get a calendar invite with the meeting link.
          </p>

          <dl className="mt-10 space-y-3">
            {contacts.map(({ label, value, href, Icon }) => (
              <Spotlight key={label} className="card flex items-center gap-4 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Icon size={16} />
                </span>
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                    {label}
                  </dt>
                  <dd className="mt-0.5 truncate text-sm">
                    <a className="transition-colors hover:text-teal-600 dark:hover:text-teal-400" href={href}>
                      {value}
                    </a>
                  </dd>
                </div>
              </Spotlight>
            ))}

            <Spotlight className="card flex items-start gap-4 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <MapPin size={16} />
              </span>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">
                  Office
                </dt>
                <dd className="mt-0.5 text-sm leading-relaxed">
                  {profile.school}
                  <br />
                  {profile.university}
                </dd>
              </div>
            </Spotlight>
          </dl>
        </Reveal>

        <Reveal i={1}>
          <div className="glass overflow-hidden rounded-3xl p-1.5 shadow-[0_40px_120px_-50px_rgba(0,0,0,.6)]">
            {/* Calendly's own inline widget — scheduling, reminders and timezones
                are their problem, not ours. No booking backend to run. */}
            <div
              className="calendly-inline-widget min-h-[720px] overflow-hidden rounded-[1.4rem]"
              data-url={`${profile.links.calendly}?hide_gdpr_banner=1&primary_color=0f9b9b`}
            />
            <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
            <noscript>
              <a href={profile.links.calendly}>Open the booking page</a>
            </noscript>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
