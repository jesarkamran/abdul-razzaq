import type { Metadata } from "next";
import LecturesHub from "@/components/LecturesHub";
import { profile } from "@/lib/data";
import { TOTAL_LECTURES } from "@/data/coursesData";

export const metadata: Metadata = {
  title: `Lectures & Courses — ${profile.name}`,
  description: `${TOTAL_LECTURES} recorded lectures across eight sequenced courses: financial accounting, business finance, depreciation, inventory valuation, liabilities and equity, cost and management accounting, cash flows, and financial statement analysis.`,
};

export default function LecturesPage() {
  return <LecturesHub />;
}
