// Writes the site's current content (data/content.json) to website-content.xlsx,
// in the exact tab/column layout `npm run sync` reads back. Upload it to Google Drive
// and open it with Google Sheets to seed the content sheet.
//   npm run export [-- out.xlsx]
import { readFile, writeFile } from "node:fs/promises";
import { crc32 } from "node:zlib";

const c = JSON.parse(await readFile(new URL("../data/content.json", import.meta.url), "utf8"));
const { links, stats, ...profile } = c.profile;

const tabs = {
  Profile: [["key", "value"], ...Object.entries(profile), ...Object.entries(links)],
  Stats: [["label", "value"], ...stats.map((s) => [s.label, s.value])],
  ResearchAreas: [["area"], ...c.researchAreas.map((a) => [a])],
  Publications: [
    ["title", "venue", "year", "areas", "abstract", "courseId"],
    ...c.publications.map((p) => [p.title, p.venue, p.year, p.areas.join("; "), p.abstract, p.courseId]),
  ],
  Courses: [
    ["courseId", "courseCode", "title", "tier", "order", "description", "syllabusHighlights"],
    ...c.courses.map((k) => [k.courseId, k.courseCode, k.title, k.tier, k.order, k.description, k.syllabusHighlights.join("; ")]),
  ],
  Videos: [
    ["courseId", "youtube", "title", "duration", "topicTag"],
    ...c.courses.flatMap((k) =>
      k.videos.map((v) => [k.courseId, `https://www.youtube.com/watch?v=${v.id}`, v.title, v.duration, v.topicTag])
    ),
  ],
};

// --- minimal xlsx: every cell is an inline string, so durations like 1:02:03 stay text ---
const esc = (s) =>
  String(s ?? "").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "").replace(/[&<>"]/g, (ch) => `&#${ch.charCodeAt(0)};`);
const col = (i) => (i >= 26 ? col(Math.floor(i / 26) - 1) : "") + String.fromCharCode(65 + (i % 26));
const sheetXml = (rows) =>
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>` +
  rows.map((r, y) => `<row r="${y + 1}">` +
    r.map((v, x) => `<c r="${col(x)}${y + 1}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`).join("") +
    `</row>`).join("") +
  `</sheetData></worksheet>`;

const names = Object.keys(tabs);
const files = {
  "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${names.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>`,
  "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
  "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${names.map((n, i) => `<sheet name="${n}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets></workbook>`,
  "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${names.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}</Relationships>`,
  ...Object.fromEntries(names.map((n, i) => [`xl/worksheets/sheet${i + 1}.xml`, sheetXml(tabs[n])])),
};

// --- uncompressed ("stored") zip container ---
const locals = [], central = [];
let offset = 0;
for (const [name, text] of Object.entries(files)) {
  const nameBuf = Buffer.from(name), data = Buffer.from(text), crc = crc32(data);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6);
  local.writeUInt32LE(crc, 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  const cen = Buffer.alloc(46);
  cen.writeUInt32LE(0x02014b50, 0); cen.writeUInt16LE(20, 4); cen.writeUInt16LE(20, 6); cen.writeUInt16LE(0x0800, 8);
  cen.writeUInt32LE(crc, 16); cen.writeUInt32LE(data.length, 20); cen.writeUInt32LE(data.length, 24);
  cen.writeUInt16LE(nameBuf.length, 28); cen.writeUInt32LE(offset, 42);
  locals.push(local, nameBuf, data);
  central.push(cen, nameBuf);
  offset += 30 + nameBuf.length + data.length;
}
const cenSize = central.reduce((n, b) => n + b.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(names.length + 4, 8); end.writeUInt16LE(names.length + 4, 10);
end.writeUInt32LE(cenSize, 12); end.writeUInt32LE(offset, 16);

const out = process.argv[2] ?? "website-content.xlsx";
await writeFile(out, Buffer.concat([...locals, ...central, end]));
console.log(`${out}: ${names.map((n) => `${n} (${tabs[n].length - 1})`).join(", ")}`);
