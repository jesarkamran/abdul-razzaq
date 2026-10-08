import content from "@/data/content.json";

// Lectures from youtube.com/@abdulrazzaq5004, sequenced by course `order`.
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

// Courses + videos come from the Google Sheet (Courses / Videos tabs) via `npm run sync`.
const RAW_COURSES = content.courses as RawCourse[];

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
