"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import type { AcademicCourse, VideoRecord } from "@/data/coursesData";

type Props = {
  course: AcademicCourse | null;
  video: VideoRecord | null;
  onClose: () => void;
  onSelect: (video: VideoRecord) => void;
};

/** Full-screen player. Prev/next walk the course in sequence, so a student can
 *  sit through a whole course without going back to the list. */
export default function LecturePlayer({ course, video, onClose, onSelect }: Props) {
  const index = course && video ? course.videos.findIndex((v) => v.id === video.id) : -1;
  const prev = course && index > 0 ? course.videos[index - 1] : null;
  const next = course && index > -1 && index < course.videos.length - 1 ? course.videos[index + 1] : null;

  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && next) onSelect(next);
      if (e.key === "ArrowLeft" && prev) onSelect(prev);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, next, prev, onClose, onSelect]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-md sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl overflow-hidden rounded-2xl bg-paper shadow-2xl dark:bg-void"
          >
            <div className="relative aspect-video bg-black">
              <iframe
                key={video.id}
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-teal-600 dark:text-teal-500">
                  {course?.courseCode} · {video.topicTag}
                  {index > -1 && course ? ` · ${index + 1} of ${course.videos.length}` : ""}
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug">{video.title}</h3>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => prev && onSelect(prev)}
                  disabled={!prev}
                  aria-label="Previous lecture"
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors
                             hover:bg-ink/5 disabled:opacity-30 dark:border-mist/20 dark:hover:bg-mist/10"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => next && onSelect(next)}
                  disabled={!next}
                  aria-label="Next lecture"
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors
                             hover:bg-ink/5 disabled:opacity-30 dark:border-mist/20 dark:hover:bg-mist/10"
                >
                  <ChevronRight size={16} />
                </button>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open on YouTube"
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors
                             hover:bg-ink/5 dark:border-mist/20 dark:hover:bg-mist/10"
                >
                  <ExternalLink size={15} />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close player"
                  className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper transition-transform
                             hover:scale-105 dark:bg-mist dark:text-void"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
