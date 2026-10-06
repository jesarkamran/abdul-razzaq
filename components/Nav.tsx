"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Magnetic, ease } from "./ui";
import { navLinks } from "@/lib/data";

const watched = ["hero", ...navLinks.map((l) => l.id)];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    if (pathname !== "/") {
      setSection(null);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    watched.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const onLectures = pathname.startsWith("/lectures");
  const current = (id: string) => {
    if (id === "lectures" && onLectures) return "page" as const;
    return pathname === "/" && section === id ? ("location" as const) : undefined;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <motion.nav
        aria-label="Primary"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className={`mx-auto flex items-center justify-between rounded-full transition-all duration-500
          ${scrolled || open
            ? "glass-strong mt-3 max-w-3xl px-4 py-2.5 shadow-[0_8px_40px_-16px_rgba(0,0,0,.35)] sm:px-5"
            : "mt-4 max-w-6xl border border-transparent px-4 py-3 sm:mt-5 sm:px-6 sm:py-4"}`}
      >
        <Magnetic strength={0.25}>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="A. Razzaq, home"
            aria-current={pathname === "/" && (!section || section === "hero") ? "page" : undefined}
            className="rounded-full font-display text-lg tracking-tight"
          >
            A. Razzaq<span aria-hidden className="text-accent-600">.</span>
          </Link>
        </Magnetic>

        <div className="flex items-center gap-1.5 sm:gap-4">
          <ul className="hidden items-center gap-1 text-sm sm:flex">
            {navLinks.map((l) => {
              const active = current(l.id);
              return (
                <li key={l.href}>
                  <Magnetic strength={0.3}>
                    <Link
                      href={l.href}
                      aria-current={active}
                      className={`relative block rounded-full px-3.5 py-2 transition-colors duration-300
                        ${active
                          ? "font-medium text-ink dark:text-mist"
                          : "text-ink/65 hover:text-ink dark:text-mist/65 dark:hover:text-mist"}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 -z-10 rounded-full bg-ink/[0.07] ring-1 ring-ink/10 dark:bg-mist/10 dark:ring-mist/15"
                        />
                      )}
                      {l.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent-500 transition-transform duration-300
                          ${active ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </Link>
                  </Magnetic>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          <Magnetic strength={0.3}>
            <Link
              href="/#booking"
              onClick={() => setOpen(false)}
              className="glow-btn inline-block rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper
                         transition-transform duration-300 hover:scale-[1.04] sm:px-5 dark:bg-mist dark:text-void"
            >
              Book<span className="sr-only"> a session</span>
            </Link>
          </Magnetic>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/12
                       transition-colors hover:bg-ink/5 sm:hidden dark:border-mist/15 dark:hover:bg-mist/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={menuRef}
            id="mobile-menu"
            aria-label="Site sections"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            className="glass-strong mx-auto mt-2 max-w-3xl origin-top overflow-hidden rounded-3xl p-2 shadow-[0_8px_40px_-16px_rgba(0,0,0,.35)] sm:hidden"
          >
            {navLinks.map((l, i) => {
              const active = current(l.id);
              return (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3, ease }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] transition-colors
                      ${active
                        ? "bg-ink/[0.07] font-medium text-ink dark:bg-mist/10 dark:text-mist"
                        : "text-ink/75 hover:bg-ink/5 dark:text-mist/75 dark:hover:bg-mist/10"}`}
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full bg-accent-500 transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
