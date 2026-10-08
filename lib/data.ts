// Content lives in the Google Sheet -> `npm run sync` -> data/content.json. Edit the sheet, not this file.
import content from "@/data/content.json";

export const profile = content.profile;

export const navLinks = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#research", label: "Research", id: "research" },
  { href: "/lectures", label: "Lectures", id: "lectures" },
  { href: "/#booking", label: "Contact", id: "booking" },
];

export const researchAreas = content.researchAreas;

// `courseId` cross-links a paper to the course that teaches its groundwork.
export const publications = content.publications;
