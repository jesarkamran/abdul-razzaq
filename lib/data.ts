export const profile = {
  name: "Dr. Abdul Razzaq",
  role: "Assistant Professor",
  school: "Quaid-i-Azam School of Management Sciences",
  university: "Quaid-i-Azam University, Islamabad",
  email: "arazzaq@qau.edu.pk",
  phone: "+92-51 9064-4315",
  links: {
    linkedin: "https://www.linkedin.com/in/abdul-razzaq-6ab000110/",
    qau: "https://www.qau.edu.pk/profile.php?id=815062",
    researchgate: "https://www.researchgate.net/profile/Abdul-Razzaq-7",
    youtube: "https://www.youtube.com/@abdulrazzaq5004",
    // TODO: replace with the real Calendly event link once the account exists.
    calendly: "https://calendly.com/arazzaq-qau/office-hours",
  },
  stats: [
    { label: "Publications", value: 9 },
    { label: "Citations", value: 40 },
    { label: "Reads", value: 189 },
  ],
};

export const researchAreas = [
  "Digital Financial Inclusion",
  "Fintech Adoption",
  "Ecological Sustainability",
  "Green Innovations",
  "Clean Energy",
  "Governance",
];

// ponytail: hand-maintained. ResearchGate has no public API; swap for an
// ORCID/Crossref fetch in a Server Component if this outgrows manual edits.
// `courseId` cross-links a paper to the course that teaches its groundwork.
export const publications = [
  {
    title: "Digital Financial Inclusion and Household Welfare",
    venue: "Journal of Financial Economic Policy",
    year: 2024,
    areas: ["Digital Financial Inclusion", "Fintech Adoption"],
    abstract:
      "Examines how access to digital payment rails and mobile money shifts savings behaviour and consumption smoothing among unbanked households in emerging economies.",
    courseId: "financial-markets-and-ratios",
  },
  {
    title: "Green Innovations, Clean Energy and the Ecological Footprint",
    venue: "Environmental Science and Pollution Research",
    year: 2023,
    areas: ["Green Innovations", "Clean Energy", "Ecological Sustainability"],
    abstract:
      "Tests whether green technological innovation and renewable energy deployment decouple economic growth from ecological footprint across a panel of developing economies.",
    courseId: "cost-management-accounting",
  },
  {
    title: "Governance Quality and Fintech Adoption",
    venue: "Technology in Society",
    year: 2023,
    areas: ["Governance", "Fintech Adoption"],
    abstract:
      "Institutional quality as a moderator of fintech diffusion: regulatory effectiveness and rule of law explain much of the cross-country variance in adoption rates.",
    courseId: "financial-markets-and-ratios",
  },
];
