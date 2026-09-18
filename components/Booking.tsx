"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

export default function Booking() {
  return (
    <section id="booking" className="px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-500">
            Office Hours
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Book a 1-on-1
          </h2>
          <p className="mt-5 text-ink/70 dark:text-mist/70">
            Thesis supervision, methods troubleshooting, or a research collaboration.
            Pick a slot and you&apos;ll get a calendar invite with the meeting link.
          </p>

          <dl className="mt-10 space-y-5 border-t border-ink/10 pt-8 text-sm dark:border-mist/10">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">Email</dt>
              <dd className="mt-1">
                <a className="hover:text-teal-600" href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">Phone</dt>
              <dd className="mt-1">
                <a className="hover:text-teal-600" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>{profile.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/50 dark:text-mist/50">Office</dt>
              <dd className="mt-1 leading-relaxed">{profile.school}<br />{profile.university}</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-ink/10 dark:border-mist/10"
        >
          {/* Calendly's own inline widget — scheduling, reminders and timezones
              are their problem, not ours. No booking backend to run. */}
          <div
            className="calendly-inline-widget min-h-[720px]"
            data-url={`${profile.links.calendly}?hide_gdpr_banner=1&primary_color=0f9b9b`}
          />
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
          <noscript>
            <a href={profile.links.calendly}>Open the booking page</a>
          </noscript>
        </motion.div>
      </div>
    </section>
  );
}
