"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.theme === "dark" ||
      (!("theme" in localStorage) && matchMedia("(prefers-color-scheme: dark)").matches);
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
      className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-sm
                 transition-colors hover:bg-ink/5 dark:border-mist/20 dark:hover:bg-mist/10"
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}
