"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { Magnetic, ease } from "./ui";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#research", label: "Research" },
  { href: "/lectures", label: "Lectures" },
  { href: "/#booking", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        // Floating pill: it shrinks and frosts once the page moves.
        className={`mx-auto flex items-center justify-between rounded-full transition-all duration-500
          ${scrolled
            ? "glass mt-3 max-w-3xl px-5 py-2.5 shadow-[0_8px_40px_-16px_rgba(0,0,0,.35)]"
            : "mt-5 max-w-6xl border border-transparent px-6 py-4"}`}
      >
        <Magnetic strength={0.25}>
          <Link href="/" className="font-display text-lg tracking-tight">
            A. Razzaq<span className="text-teal-600">.</span>
          </Link>
        </Magnetic>

        <div className="flex items-center gap-2 sm:gap-5">
          <ul className="hidden items-center gap-1 text-sm sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Magnetic strength={0.3}>
                  <Link
                    href={l.href}
                    className="relative rounded-full px-3.5 py-2 text-ink/70 transition-colors
                               hover:bg-ink/5 hover:text-ink dark:text-mist/70 dark:hover:bg-mist/10 dark:hover:text-mist"
                  >
                    {l.label}
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <Magnetic strength={0.3}>
            <Link
              href="/#booking"
              className="glow-btn inline-block rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper
                         transition-transform duration-300 hover:scale-[1.04] dark:bg-mist dark:text-void"
            >
              Book
            </Link>
          </Magnetic>
        </div>
      </motion.nav>
    </header>
  );
}
