"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${scrolled ? "border-b border-ink/10 bg-paper/80 backdrop-blur-xl dark:border-mist/10 dark:bg-void/80" : ""}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-tight">
          A. Razzaq<span className="text-teal-600">.</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="hidden items-center gap-6 text-sm sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink/70 transition-colors hover:text-ink dark:text-mist/70 dark:hover:text-mist">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Link
            href="/#booking"
            className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper
                       transition-transform hover:-translate-y-0.5 dark:bg-mist dark:text-void"
          >
            Book
          </Link>
        </div>
      </nav>
    </header>
  );
}
