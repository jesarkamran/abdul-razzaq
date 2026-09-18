# Dr. Abdul Razzaq — academic site

Next.js 15 (App Router) · Tailwind CSS 4 · Framer Motion · TypeScript

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Before going live
1. `public/profile.jpg` is the hero portrait (316×316). Swap in a higher-resolution square crop when one is available — the layout is already square, so nothing else changes.
2. Put the real Calendly link in `lib/data.ts` → `profile.links.calendly`.
3. Publication titles/venues in `lib/data.ts` are placeholders — replace with the real 9 from ResearchGate.

## Content
- `data/coursesData.ts` — 93 lectures in 8 sequenced courses (ACT-101 → FIN-401).
  `lectureCount`, `totalDuration` and each `url` are derived from the video list,
  so adding a lecture is one line and every count updates itself.
- `lib/data.ts` — profile, contact links, research areas, publications. A publication's
  `courseId` cross-links it to the course that teaches its groundwork.

## Routes
- `/` — hero, about, research, course grid, booking
- `/lectures` — LecturesHub: search, tier filter, expandable course accordion
- `/lectures/[slug]` — one course: syllabus, all its lectures, prev/next course, related papers
