// Pulls site content from the Google Sheet into data/content.json.
//   npm run sync                    -> fetch the sheet in CONTENT_FILE_URL (.env) or SHEET_ID
//   node scripts/sync-content.mjs <dir>  -> read <dir>/<Tab>.csv instead
// The sheet must be shared "Anyone with the link: Viewer".
// Any bad row aborts before writing, so a typo in the sheet can't blank the site.
import { readFile, writeFile } from "node:fs/promises";

const TABS = ["Profile", "Stats", "ResearchAreas", "Publications", "Courses", "Videos"];
const TIERS = ["Beginner", "Intermediate", "Advanced"];

const parseCsv = (text) => {
  const rows = [[""]];
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], row = rows[rows.length - 1];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') row[row.length - 1] += '"', i++;
      else if (ch === '"') quoted = false;
      else row[row.length - 1] += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") row.push("");
    else if (ch === "\n") rows.push([""]);
    else if (ch !== "\r") row[row.length - 1] += ch;
  }
  const [header, ...body] = rows;
  return body
    .filter((r) => r.some((c) => c.trim()))
    .map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
};

const list = (s) => s.split(";").map((x) => x.trim()).filter(Boolean);

const youtubeId = (s) => s.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/)?.[1] ?? s;

const fail = (tab, i, msg) => {
  throw new Error(`${tab} row ${i + 2}: ${msg}`);
};

const load = async (tab) => {
  const src = process.argv[2];
  if (src) return parseCsv(await readFile(`${src}/${tab}.csv`, "utf8"));
  const id = process.env.SHEET_ID || process.env.CONTENT_FILE_URL?.match(/\/d\/([\w-]+)/)?.[1];
  if (!id) throw new Error("Set CONTENT_FILE_URL in .env to the Google Sheet link.");
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`
  );
  if (!res.ok) throw new Error(`${tab}: HTTP ${res.status} — is the sheet shared publicly?`);
  return parseCsv(await res.text());
};

const [profileRows, stats, areas, pubs, courses, videos] = await Promise.all(TABS.map(load));

const p = Object.fromEntries(profileRows.map((r) => [r.key, r.value]));
const LINKS = ["linkedin", "qau", "researchgate", "youtube", "calendly"];
const profile = {
  ...Object.fromEntries(Object.entries(p).filter(([k]) => !LINKS.includes(k))),
  links: Object.fromEntries(LINKS.map((k) => [k, p[k] ?? ""])),
  stats: stats.map((r, i) => {
    const value = Number(r.value);
    if (!r.label || Number.isNaN(value)) fail("Stats", i, "needs a label and a numeric value");
    return { label: r.label, value };
  }),
};
for (const k of ["name", "role", "school", "university", "email"])
  if (!profile[k]) throw new Error(`Profile: missing "${k}"`);

const courseIds = new Set(courses.map((c) => c.courseId));

const content = {
  profile,
  researchAreas: areas.map((r) => r.area).filter(Boolean),
  publications: pubs.map((r, i) => {
    const year = Number(r.year);
    if (!r.title || !year) fail("Publications", i, "needs a title and a year");
    if (r.courseId && !courseIds.has(r.courseId)) fail("Publications", i, `unknown courseId "${r.courseId}"`);
    return { title: r.title, venue: r.venue, year, areas: list(r.areas), abstract: r.abstract, courseId: r.courseId };
  }),
  courses: courses.map((c, i) => {
    if (!c.courseId || !c.title) fail("Courses", i, "needs a courseId and a title");
    if (!TIERS.includes(c.tier)) fail("Courses", i, `tier must be one of ${TIERS.join(", ")}`);
    return {
      courseId: c.courseId,
      courseCode: c.courseCode,
      title: c.title,
      tier: c.tier,
      order: Number(c.order) || i + 1,
      description: c.description,
      syllabusHighlights: list(c.syllabusHighlights),
      videos: videos
        .map((v, j) => [v, j])
        .filter(([v]) => v.courseId === c.courseId)
        .map(([v, j]) => {
          if (!/^(\d+:)?\d{1,2}:\d{2}$/.test(v.duration)) fail("Videos", j, `duration "${v.duration}" should look like 12:34 or 1:02:03`);
          return { id: youtubeId(v.youtube), title: v.title, duration: v.duration, topicTag: v.topicTag };
        }),
    };
  }),
};
videos.forEach((v, j) => {
  if (!courseIds.has(v.courseId)) fail("Videos", j, `unknown courseId "${v.courseId}"`);
  if (!v.youtube || !v.title) fail("Videos", j, "needs a youtube link/id and a title");
});

await writeFile(new URL("../data/content.json", import.meta.url), JSON.stringify(content, null, 2) + "\n");
console.log(`content.json: ${content.courses.length} courses, ${videos.length} videos, ${content.publications.length} publications`);
