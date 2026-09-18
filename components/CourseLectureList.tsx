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
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {course.videos.map((v, i) => (
          <motion.li
            key={v.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 3) * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => setVideo(v)}
              className="group block w-full overflow-hidden rounded-2xl border border-ink/10 text-left
                         transition-colors hover:border-ink/25 dark:border-mist/10 dark:hover:border-mist/25"
            >
              <span className="relative block aspect-video bg-ink/5 dark:bg-mist/5">
                {/* Facade: no YouTube JS until someone actually plays something. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover:bg-black/40">
                  <span className="grid h-14 w-14 translate-y-1 place-items-center rounded-full bg-white/95
                                   text-black opacity-0 transition-all duration-300
                                   group-hover:translate-y-0 group-hover:opacity-100">
                    <Play size={18} className="translate-x-px" fill="currentColor" />
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
                <span className="block font-mono text-[10px] uppercase tracking-widest text-teal-600 dark:text-teal-500">
                  {v.topicTag}
                </span>
                <span className="mt-2 block text-[15px] leading-snug">{v.title}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ol>

      <LecturePlayer course={course} video={video} onClose={() => setVideo(null)} onSelect={setVideo} />
    </>
  );
}
