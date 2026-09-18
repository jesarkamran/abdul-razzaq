"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        // Floating pill: it shrinks and frosts once the page moves. On phones it
        // stays frosted whenever the menu is open, so the panel reads as one piece.
        className={`mx-auto flex items-center justify-between rounded-full transition-all duration-500
          ${scrolled || open
            ? "glass mt-3 max-w-3xl px-4 py-2.5 shadow-[0_8px_40px_-16px_rgba(0,0,0,.35)] sm:px-5"
            : "mt-4 max-w-6xl border border-transparent px-4 py-3 sm:mt-5 sm:px-6 sm:py-4"}`}
      >
        <Magnetic strength={0.25}>
          <Link href="/" onClick={() => setOpen(false)} className="font-display text-lg tracking-tight">
            A. Razzaq<span className="text-teal-600">.</span>
          </Link>
        </Magnetic>

        <div className="flex items-center gap-1.5 sm:gap-5">
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
              onClick={() => setOpen(false)}
              className="glow-btn inline-block rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper
                         transition-transform duration-300 hover:scale-[1.04] sm:px-5 dark:bg-mist dark:text-void"
            >
              Book
            </Link>
          </Magnetic>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/12
                       transition-colors hover:bg-ink/5 sm:hidden dark:border-mist/15 dark:hover:bg-mist/10"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile panel — the sm:flex link row has nowhere to go on a phone. */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
            className="glass mx-auto mt-2 max-w-3xl overflow-hidden rounded-3xl p-2 shadow-[0_8px_40px_-16px_rgba(0,0,0,.35)] sm:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-ink/75 transition-colors
                             hover:bg-ink/5 dark:text-mist/75 dark:hover:bg-mist/10"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
