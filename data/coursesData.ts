// 93 lectures from youtube.com/@abdulrazzaq5004, sequenced ACT-101 -> FIN-401.
// lectureCount, totalDuration and url are derived in build() below: the three
// things most likely to drift when a lecture is added, so nothing hand-counts them.

export interface VideoRecord {
  id: string;
  title: string;
  url: string;
  duration: string;
  topicTag: string;
}

export type CourseTier = "Beginner" | "Intermediate" | "Advanced";

export interface AcademicCourse {
  courseId: string;
  courseCode: string;
  title: string;
  tier: CourseTier;
  order: number;
  totalDuration: string;
  lectureCount: number;
  description: string;
  syllabusHighlights: string[];
  videos: VideoRecord[];
}

type RawCourse = Omit<AcademicCourse, "videos" | "lectureCount" | "totalDuration"> & {
  videos: Omit<VideoRecord, "url">[];
};

const seconds = (hhmmss: string) =>
  hhmmss.split(":").map(Number).reverse().reduce((acc, n, i) => acc + n * 60 ** i, 0);

const runtime = (total: number) =>
  `${Math.floor(total / 3600)}h ${String(Math.round((total % 3600) / 60)).padStart(2, "0")}m`;

const build = (c: RawCourse): AcademicCourse => ({
  ...c,
  lectureCount: c.videos.length,
  totalDuration: runtime(c.videos.reduce((acc, v) => acc + seconds(v.duration), 0)),
  videos: c.videos.map((v) => ({ ...v, url: `https://www.youtube.com/watch?v=${v.id}` })),
});

const RAW_COURSES: RawCourse[] = [
  {
    courseId: "financial-accounting-basics",
    courseCode: "ACT-101",
    title: "Financial Accounting Fundamentals & Mechanics",
    tier: "Beginner",
    order: 1,
    description:
      "Foundational double-entry bookkeeping, transaction analysis, ledger balances, and comprehensive exercise problem walkthroughs.",
    syllabusHighlights: [
      "Debit & Credit Conventions",
      "Ledger Postings",
      "Trial Balance",
      "Textbook Exercises 2.1 - 2.13 & Problem Sets",
    ],
    videos: [
      { id: "fG2P70TJMDg", title: "Accounting Basics 01", duration: "25:49", topicTag: "Fundamentals" },
      { id: "bZd7JFiKOUU", title: "Accounting Basics 02", duration: "24:26", topicTag: "Fundamentals" },
      { id: "O0hnSDZNz-A", title: "Accounting Basics 03", duration: "15:15", topicTag: "Fundamentals" },
      { id: "BQhSczo24ys", title: "Accounting Basics 04", duration: "39:29", topicTag: "Mechanics" },
      { id: "NGI5nnddI1A", title: "Accounting Basics 05", duration: "37:05", topicTag: "Mechanics" },
      { id: "ciIG9_bmRt0", title: "Accounting Basics 06", duration: "22:58", topicTag: "Ledgers" },
      { id: "NXnn5IR44Dg", title: "Accounting Basics 07", duration: "22:51", topicTag: "Ledgers" },
      { id: "BKTQwd4VL20", title: "Accounting Exercise 2.1, 2.2, 2.3", duration: "26:26", topicTag: "Exercise Practice" },
      { id: "iaIZQP0O8v0", title: "Problem 2.1", duration: "25:05", topicTag: "Problem Solving" },
      { id: "2wZuxKc1m7c", title: "Problem 2.2", duration: "15:58", topicTag: "Problem Solving" },
      { id: "Y3XcvuZyyYk", title: "Exercise 2.4, 2.5, 2.13", duration: "1:01:10", topicTag: "Comprehensive Practice" },
    ],
  },
  {
    courseId: "principles-of-finance",
    courseCode: "FIN-101",
    title: "Principles of Business Finance & Interest Theory",
    tier: "Beginner",
    order: 2,
    description:
      "Core concepts of managerial finance, interest calculations, tax implications on capital decisions, and firm value creation.",
    syllabusHighlights: [
      "Time Preference of Money",
      "Simple & Compound Interest",
      "Corporate Taxation",
      "Capital Sourcing",
    ],
    videos: [
      { id: "USHE-7GDe7Y", title: "Basics of Finance 01", duration: "11:40", topicTag: "Core Concept" },
      { id: "6DiYyxpuKmU", title: "Basics of Finance 02", duration: "12:33", topicTag: "Core Concept" },
      { id: "-EBMCKQrIvo", title: "Basics of Finance 03", duration: "24:13", topicTag: "Capital Function" },
      { id: "Pe_OIuZYNoA", title: "Basics of Finance 04", duration: "09:42", topicTag: "Corporate Governance" },
      { id: "0jdDZNM91tg", title: "Basics of Finance 05", duration: "54:31", topicTag: "Financial Decisions" },
      { id: "INvIGZu9Mfs", title: "Basics of Finance 06", duration: "30:11", topicTag: "Capital Allocation" },
      { id: "v9aUw5Y0yXY", title: "Basics of Finance 07", duration: "27:54", topicTag: "Market Rates" },
      { id: "kj9RLeZl2mE", title: "Basics of Finance 08", duration: "26:28", topicTag: "Valuation Fundamentals" },
      { id: "x6_124a1c5c", title: "Basics of Finance 09", duration: "29:54", topicTag: "Risk & Return" },
      { id: "2eZy_IiOXyQ", title: "Interest 01", duration: "27:11", topicTag: "Interest Calculations" },
      { id: "j54ZLcbmsl8", title: "Tax 01", duration: "34:17", topicTag: "Corporate Taxation" },
    ],
  },
  {
    courseId: "depreciation-fixed-assets",
    courseCode: "ACT-201",
    title: "Fixed Assets, Depreciation Accounting & Asset Disposal",
    tier: "Intermediate",
    order: 3,
    description:
      "Complete mastery of tangible fixed asset accounting, straight-line, declining balance, units of production (UOP), and sum-of-the-years'-digits (SOYD) methods.",
    syllabusHighlights: [
      "Asset Capitalization",
      "Straight Line & UOP",
      "Double Declining Balance",
      "SOYD Method",
      "Depreciation Schedules",
    ],
    videos: [
      { id: "3QQyHOiagnk", title: "Depreciation 01 — Why Depreciate an Asset", duration: "18:45", topicTag: "Theoretical Foundations" },
      { id: "X_nB7Olb9y0", title: "Depreciation 02 — Issues & the Need for Different Methods", duration: "32:14", topicTag: "Methodology Comparison" },
      { id: "cnx0PDb3-sk", title: "Depreciation 03 — Straight Line and UOP Method", duration: "15:51", topicTag: "SL & UOP Methods" },
      { id: "AcaHmYKutgM", title: "Depreciation 04 — Double Declining Method", duration: "20:12", topicTag: "Accelerated Methods" },
      { id: "l_19v-7IytI", title: "Depreciation 05 — SOYD Method", duration: "09:21", topicTag: "Sum of Years' Digits" },
      { id: "u5Pyw4ao0a4", title: "Depreciation 06", duration: "54:48", topicTag: "Schedule Formulation" },
      { id: "QLytG_yeKGg", title: "Depreciation 07", duration: "22:58", topicTag: "Partial Year Depreciation" },
      { id: "zEEABIEwvDY", title: "Depreciation 08", duration: "25:52", topicTag: "Revaluation & Impairment" },
      { id: "jCEh-DIm2uA", title: "Depreciation 09", duration: "10:34", topicTag: "Disposal & Retirement" },
      { id: "wHqzmnV8JO0", title: "Depreciation 10", duration: "22:28", topicTag: "Exchange of Assets" },
      { id: "CvOl3Hn3aNk", title: "Depreciation 11", duration: "15:17", topicTag: "Comprehensive Problem" },
    ],
  },
  {
    courseId: "inventory-valuation-systems",
    courseCode: "ACT-202",
    title: "Inventory Systems, Cost Flow Assumptions & Valuation",
    tier: "Intermediate",
    order: 4,
    description:
      "Perpetual vs. periodic inventory mechanisms, inventory cost flow assumptions (FIFO, LIFO, weighted average cost), and Chapter 8 exercise walkthroughs.",
    syllabusHighlights: [
      "Perpetual Inventory Cards",
      "FIFO vs. LIFO Tax Effects",
      "Lower of Cost or Net Realizable Value",
      "Exercise 8.3 - 8.10 Series",
    ],
    videos: [
      { id: "R67RSU3SvrE", title: "Stop Confusing FIFO & LIFO! Inventory Cost Flow in One Complete Lecture", duration: "1:33:17", topicTag: "Masterclass" },
      { id: "iCBqhnL3u0U", title: "Perpetual Inventory System Explained with FIFO, LIFO & Average Cost", duration: "37:29", topicTag: "Perpetual Records" },
      { id: "wNoyLZaF00U", title: "Problem 8.3 A (Sr. 03)", duration: "22:25", topicTag: "Practice Set" },
      { id: "_iYvnwv1FBY", title: "Exercise 8.3 (Sr. 04)", duration: "13:42", topicTag: "Exercise Practice" },
      { id: "ZFEjwQ1eskM", title: "Exercise 8.4 (Sr. 05)", duration: "19:29", topicTag: "Exercise Practice" },
      { id: "DtTJaPTJ1Fs", title: "Exercise 8.5 (Sr. 06)", duration: "23:24", topicTag: "Exercise Practice" },
      { id: "uFMouwr_Loo", title: "Exercise 8.6 (Sr. 07)", duration: "26:36", topicTag: "Exercise Practice" },
      { id: "jyWQcag2kYc", title: "Exercise 8.8 (Sr. 08)", duration: "17:21", topicTag: "Exercise Practice" },
      { id: "euV_luDHmVE", title: "Exercise 8.9 & 8.10 (Sr. 09)", duration: "22:48", topicTag: "Exercise Practice" },
    ],
  },
  {
    courseId: "liabilities-and-equity",
    courseCode: "ACT-203",
    title: "Corporate Liabilities, Shareholder Equity & Capital Structure",
    tier: "Intermediate",
    order: 5,
    description:
      "Detailed treatment of current and long-term liabilities, bonds payable, and the accounting for corporate stock issuances and paid-in capital.",
    syllabusHighlights: [
      "Current & Long-Term Liabilities",
      "Common vs Preferred Stock",
      "Additional Paid-In Capital (APIC)",
      "Treasury Stock",
      "Retained Earnings",
    ],
    videos: [
      { id: "erHHXUyq0-w", title: "Liabilities 01", duration: "50:16", topicTag: "Liabilities" },
      { id: "WQu4FCqIEn4", title: "Liabilities 02", duration: "1:19:03", topicTag: "Long-Term Debt" },
      { id: "YecaHJfDedA", title: "Stockholders' Equity — Paid-In Capital 01", duration: "41:57", topicTag: "Paid-In Capital" },
      { id: "ltyL4WeyiN4", title: "Stockholders' Equity — Paid-In Capital 02", duration: "49:01", topicTag: "Par Value Mechanics" },
      { id: "CEIWX6KmNp4", title: "Stockholders' Equity — Paid-In Capital 03", duration: "50:35", topicTag: "Stock Subscriptions" },
      { id: "9xXBfRQ0_N4", title: "Shareholders' Equity — Paid-In Capital 04", duration: "25:04", topicTag: "Stock Splits & Dividends" },
      { id: "sQHXNfFi5pI", title: "Shareholders' Equity — Paid-In Capital 05", duration: "27:08", topicTag: "Retained Earnings Allocation" },
      { id: "skl0U5b-Ml0", title: "Shareholders' Equity — Paid-In Capital 06", duration: "33:52", topicTag: "Financial Statement Disclosure" },
    ],
  },
  {
    courseId: "cost-management-accounting",
    courseCode: "CMA-301",
    title: "Cost & Management Accounting, Budgeting & EOQ Models",
    tier: "Advanced",
    order: 6,
    description:
      "Managerial decision making, cost classification and segregation, job-order costing, comprehensive budgeting, and Economic Order Quantity (EOQ) optimization.",
    syllabusHighlights: [
      "Fixed vs Variable Costs",
      "Contribution Margin & CVP",
      "Job Order Costing",
      "Sales & Production Budgets",
      "EOQ & Safety Stock Formulas",
    ],
    videos: [
      { id: "TxN_xUuUMgg", title: "Cost Terms, Concepts and Classification 01", duration: "38:25", topicTag: "Cost Classification" },
      { id: "Vl4fAo0d6wk", title: "Cost Terms, Concepts and Classification 02", duration: "47:01", topicTag: "Product vs Period Costs" },
      { id: "bB5YqETf4vU", title: "Cost Terms, Concepts and Classification 03", duration: "33:35", topicTag: "Direct vs Indirect" },
      { id: "MTTCYDZ1zvs", title: "Cost Terms, Concepts and Classification 04", duration: "17:19", topicTag: "Cost Behavior" },
      { id: "C_eQowZPvms", title: "Cost Behaviour and Segregation of Fixed & Variable Costs", duration: "29:45", topicTag: "Cost Segregation" },
      { id: "IswqpHd_wkI", title: "Fixed Cost Behaviour", duration: "18:42", topicTag: "Fixed Costs" },
      { id: "SZu5SrmdwC0", title: "Variable Cost Behaviour", duration: "06:14", topicTag: "Variable Costs" },
      { id: "JCbBDLzlL5E", title: "Contribution Margin", duration: "28:23", topicTag: "CVP Analysis" },
      { id: "y_TenBH0w8c", title: "Job Order Costing 01", duration: "21:13", topicTag: "Job Order Costing" },
      { id: "lQqjI6lQMhI", title: "Learn Sales Budget in One Lecture | Cost & Management Accounting Made Simple", duration: "20:02", topicTag: "Operational Budgets" },
      { id: "sszv1ZH8CZA", title: "Sales Budget + Production Budget (Step-by-Step) | Full Lecture with Numerical", duration: "41:12", topicTag: "Production Schedules" },
      { id: "bphDDi53Fto", title: "Budgeting — Chapter 16, Questions 2, 3 & 5", duration: "41:12", topicTag: "Budget Exercises" },
      { id: "SG3xbzwDHns", title: "EOQ Basics 01", duration: "37:36", topicTag: "Inventory Modeling" },
      { id: "zSnh4_h2ezE", title: "EOQ Basics 02 and Derivation", duration: "32:43", topicTag: "Formula Derivations" },
      { id: "tRW_fYSzCLc", title: "EOQ and Safety Stock — Question Practice", duration: "32:44", topicTag: "Safety Stock Analytics" },
    ],
  },
  {
    courseId: "cash-flow-analysis",
    courseCode: "FIN-301",
    title: "Statement of Cash Flows: Analysis, Preparation & Reporting",
    tier: "Advanced",
    order: 7,
    description:
      "Complete practical guide to preparing the statement of cash flows under direct and indirect methodologies, reconciling net income, and auditing liquidity flows.",
    syllabusHighlights: [
      "Operating Cash Flows (Direct vs Indirect)",
      "Investing Activities & Capital Outlays",
      "Financing Cash Flows",
      "Non-Cash Transactions",
      "Cash Flow Reconciliation",
    ],
    videos: [
      { id: "M4_V5dVET7c", title: "Introduction to Cash Flows 01", duration: "27:38", topicTag: "Conceptual Foundation" },
      { id: "eFc-ncW6E4s", title: "Cash Flow Statement 02", duration: "07:09", topicTag: "Structure & Setup" },
      { id: "-SaULsZKug0", title: "Cash Flow Statement 03", duration: "09:00", topicTag: "Operating Section" },
      { id: "z9yORLnbSIQ", title: "Cash Flow Statement 04", duration: "07:16", topicTag: "Investing Inflows" },
      { id: "UPKRivDa_C8", title: "Cash Flow Statement 05", duration: "08:07", topicTag: "Financing Inflows" },
      { id: "IUsTl_DJvPQ", title: "Cash Flow Statement 06", duration: "08:13", topicTag: "Working Capital Changes" },
      { id: "NTKcWQATGaA", title: "Cash Flow Statement 07", duration: "04:46", topicTag: "Net Cash Summary" },
      { id: "fgNGCtiijIY", title: "Operating Cash Flows — Question Walkthrough", duration: "24:53", topicTag: "Operating Activities Numerical" },
      { id: "XFvWPQWBiow", title: "Investing Cash Flows — Question Walkthrough", duration: "18:11", topicTag: "Investing Activities Numerical" },
      { id: "iihAcpAv7rw", title: "Financing Cash Flows — Question Walkthrough", duration: "25:01", topicTag: "Financing Activities Numerical" },
      { id: "i8ud4BNywKQ", title: "Operating Cash Flows, Indirect Method — Question Walkthrough", duration: "10:26", topicTag: "Indirect Method Reconciliations" },
    ],
  },
  {
    courseId: "financial-markets-and-ratios",
    courseCode: "FIN-401",
    title: "Financial Statement Analysis, Ratio Analysis & Capital Markets",
    tier: "Advanced",
    order: 8,
    description:
      "Advanced corporate liquidity, solvency risk evaluation, asset turnover efficiency metrics, DuPont analysis, and money market / capital market structures.",
    syllabusHighlights: [
      "Total Asset Turnover (TATO)",
      "Accounts Payable & Receivable Turnovers",
      "Survival Liquidity & Solvency Ratios",
      "Money Market Instruments",
      "Underwriting Syndicates",
    ],
    videos: [
      { id: "kpV6lBcJc5k", title: "Financial Statement Analysis Made SIMPLE (Ratio Analysis Tutorial)", duration: "10:52", topicTag: "Ratio Analysis Overview" },
      { id: "VKOqdsSmCN8", title: "Will This Company Go Bankrupt? 3 Liquidity Ratios to Check", duration: "12:41", topicTag: "Liquidity & Distress" },
      { id: "OI50q9Sq6HQ", title: "Is the Debt Killing the Company? Solvency Ratios Explained", duration: "15:59", topicTag: "Solvency & Financial Leverage" },
      { id: "pEWpOJl-Uh0", title: "Total Asset Turnover Ratio Explained | Meaning, Formula & Examples", duration: "07:05", topicTag: "Asset Efficiency" },
      { id: "LeU04Mjp82c", title: "Inventory Turnover Ratio Explained | Meaning, Formula & Examples", duration: "08:33", topicTag: "Inventory Velocity" },
      { id: "zuQuecjpi1c", title: "Accounts Payable Turnover (With Formula) | Activity Ratios Made Easy", duration: "07:36", topicTag: "Payable Velocity" },
      { id: "_mVj_Jh9vnM", title: "Accounts Receivable Turnover (With Formula) | Activity Ratios Made Easy", duration: "10:08", topicTag: "Receivable Velocity" },
      { id: "YD4iTYrgyFk", title: "Brief Exercise 3.6", duration: "07:35", topicTag: "Ratio Numerical" },
      { id: "qU1Ntzfo6vk", title: "Brief Exercise 3.6 (b)", duration: "03:25", topicTag: "Ratio Numerical" },
      { id: "vw6GPLnRIYA", title: "Brief Exercise 3.7", duration: "09:14", topicTag: "Ratio Numerical" },
      { id: "J7rrl-P5DQ4", title: "Brief Exercise 3.8", duration: "08:22", topicTag: "Ratio Numerical" },
      { id: "iPJnLdAp1ZA", title: "Financial Environment Basics 01", duration: "10:08", topicTag: "Institutional Architecture" },
      { id: "DhE6WX2rI7g", title: "Financial Environment Basics 02", duration: "15:34", topicTag: "Underwriting & Brokers" },
      { id: "scnNbkbArLM", title: "Financial Environment Basics 03", duration: "06:25", topicTag: "Regulatory Frameworks" },
      { id: "OvjDVbqk_lU", title: "Types of Financial Markets", duration: "11:37", topicTag: "Market Taxonomy" },
      { id: "SQa_HxinHls", title: "Capital Markets 01", duration: "12:21", topicTag: "Capital Markets" },
      { id: "2MjXuJqa6Xc", title: "Money Market and Its Instruments / Securities", duration: "18:36", topicTag: "Money Market Instruments" },
    ],
  },
];

export const ACADEMIC_COURSES: AcademicCourse[] = [...RAW_COURSES]
  .sort((a, b) => a.order - b.order)
  .map(build);

export const TIERS: CourseTier[] = ["Beginner", "Intermediate", "Advanced"];

export const ALL_VIDEOS: VideoRecord[] = ACADEMIC_COURSES.flatMap((c) => c.videos);

export const TOTAL_LECTURES = ALL_VIDEOS.length;

export const TOTAL_RUNTIME = runtime(
  ALL_VIDEOS.reduce((acc, v) => acc + seconds(v.duration), 0)
);

export const courseById = (id: string) => ACADEMIC_COURSES.find((c) => c.courseId === id);

export const courseOfVideo = (videoId: string) =>
  ACADEMIC_COURSES.find((c) => c.videos.some((v) => v.id === videoId));
