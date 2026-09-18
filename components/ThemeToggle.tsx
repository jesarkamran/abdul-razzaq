"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Light unless the visitor has picked dark before. Mirrors the inline
    // script in app/layout.tsx — keep the two in step.
    const saved = localStorage.theme === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.theme = next ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-full border border-ink/12 text-sm transition-all
                 duration-300 hover:scale-105 hover:border-teal-500/50 hover:text-teal-600
                 dark:border-mist/15 dark:hover:text-teal-400"
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
