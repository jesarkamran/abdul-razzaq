# Dr. Abdul Razzaq — academic site

Next.js 15 (App Router) · Tailwind CSS 4 · Framer Motion · TypeScript

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Before going live
1. `public/profile.jpg` is the hero portrait (316×316). Swap in a higher-resolution square crop when one is available — the layout is already square, so nothing else changes.
2. Put the real Calendly link in the sheet → `Profile` tab, `calendly` row.
3. Publication titles/venues in the `Publications` tab are placeholders — replace with the real 9 from ResearchGate.

## Content (Google Sheet)
All text, publications, courses and videos live in one Google Sheet with tabs
`Profile`, `Stats`, `ResearchAreas`, `Publications`, `Courses`, `Videos`.
First time: `npm run export` writes `website-content.xlsx` with every tab filled from the current
site. Upload it to Google Drive and open it with Google Sheets (File → Save as Google Sheets).
Share it "Anyone with the link: Viewer", then:

```bash
SHEET_ID=<id from the sheet URL> npm run sync   # writes data/content.json
npm run build                                   # or commit + push to redeploy
```

- **New video:** add a row in `Videos`: `courseId`, YouTube link, title, duration (`12:34` / `1:02:03`), topicTag.
  Row order = lecture order. Counts and runtimes recalculate themselves.
- **New course:** add a row in `Courses` (tier = Beginner / Intermediate / Advanced), then its videos.
- Lists inside one cell (`syllabusHighlights`, publication `areas`) are separated by `;`.
- **Auto sync:** `.github/workflows/sync-content.yml` runs hourly (needs repo secret `CONTENT_FILE_URL`) and commits
  `data/content.json` only when the sheet changed. Need it now? Actions → "Sync content" → Run workflow.
- If a row is wrong the sync stops with the tab and row number and leaves the site unchanged.

## Routes
- `/` — hero, about, research, course grid, booking
- `/lectures` — LecturesHub: search, tier filter, expandable course accordion
- `/lectures/[slug]` — one course: syllabus, all its lectures, prev/next course, related papers
