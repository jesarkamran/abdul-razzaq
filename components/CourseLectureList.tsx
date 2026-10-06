"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import LecturePlayer from "./LecturePlayer";
import type { AcademicCourse, VideoRecord } from "@/data/coursesData";

export default function CourseLectureList({ course }: { course: AcademicCourse }) {
  const [video, setVideo] = useState<VideoRecord | null>(null);

  return (
    <>
      <ol aria-label={`${course.title} lectures`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {course.videos.map((v, i) => (
          <motion.li
            key={v.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 3) * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => setVideo(v)}
              aria-label={`Play lecture ${i + 1}: ${v.title}, ${v.topicTag}, ${v.duration}`}
              className="group block h-full w-full overflow-hidden rounded-2xl border border-ink/10 text-left
                         transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/50
                         hover:shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--color-accent-500)_60%,transparent)]
                         focus-visible:-translate-y-1 dark:border-mist/10 dark:hover:border-accent-400/50"
            >
              <span className="relative block aspect-video overflow-hidden bg-ink/5 dark:bg-mist/5">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover:bg-black/40 group-focus-visible:bg-black/40">
                  <span className="grid h-14 w-14 translate-y-1 scale-90 place-items-center rounded-full bg-white/95
                                   text-black opacity-0 shadow-xl transition-all duration-300
                                   group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100
                                   group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                    <Play size={18} className="translate-x-px" fill="currentColor" aria-hidden />
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-white">
                  {v.duration}
                </span>
                <span className="absolute bottom-2 left-2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>

              <span className="block p-5">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent-700 dark:text-accent-400">
                  {v.topicTag}
                </span>
                <span className="mt-2 block text-[15px] leading-snug transition-colors group-hover:text-accent-700 dark:group-hover:text-accent-400">
                  {v.title}
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </ol>

      <LecturePlayer course={course} video={video} onClose={() => setVideo(null)} onSelect={setVideo} />
    </>
  );
}
