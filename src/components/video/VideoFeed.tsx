"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { mockVideos } from "@/data/mockVideos";
import { MuteProvider } from "@/hooks/useMuteState";
import VideoCard from "./VideoCard";

export default function VideoFeed() {

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const videoCount = mockVideos.length;
  const tripleVideos = [...mockVideos, ...mockVideos, ...mockVideos];
  const [currentIndex, setCurrentIndex] = useState<number>(videoCount);
  const hasInitialized = useRef<boolean>(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || hasInitialized.current) return;

    requestAnimationFrame(() => {
      const itemHeight = container.clientHeight;
      container.scrollTop = videoCount * itemHeight;
      hasInitialized.current = true;
    });
  }, [videoCount]);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const targetChild = container.children[index] as HTMLElement | undefined;
    if (targetChild) {
      targetChild.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const jumpToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemHeight = container.clientHeight;
    container.scrollTop = index * itemHeight;
  }, []);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  }, [currentIndex, scrollToIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < tripleVideos.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  }, [currentIndex, tripleVideos.length, scrollToIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const { scrollTop, clientHeight } = container;
      const newIndex = Math.round(scrollTop / clientHeight);
      setCurrentIndex(newIndex);

      if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        const settledIndex = Math.round(container.scrollTop / clientHeight);

        if (settledIndex < videoCount) {
          const equivalentIndex = settledIndex + videoCount;
          jumpToIndex(equivalentIndex);
          setCurrentIndex(equivalentIndex);
        } else if (settledIndex >= 2 * videoCount) {
          const equivalentIndex = settledIndex - videoCount;
          jumpToIndex(equivalentIndex);
          setCurrentIndex(equivalentIndex);
        }
      }, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [videoCount, jumpToIndex]);

  return (
    <MuteProvider>
      <div className="relative h-full w-full">
        <div
          id="video-feed-container"
          ref={scrollContainerRef}
          className="snap-container w-full h-full"
        >
          {tripleVideos.map((video, globalIndex) => (
            <VideoCard key={`${video.id}-${globalIndex}`} video={video} />
          ))}
        </div>

        <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
          <motion.button
            id="nav-prev"
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="
            w-11 h-11 rounded-full
            flex items-center justify-center
            bg-white/10 backdrop-blur-sm
            border border-white/10
            hover:bg-white/20 cursor-pointer
          "
            aria-label="Video trước"
          >
            <ChevronUp size={22} className="text-white" />
          </motion.button>

          <motion.button
            id="nav-next"
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="
            w-11 h-11 rounded-full
            flex items-center justify-center
            bg-white/10 backdrop-blur-sm
            border border-white/10
            hover:bg-white/20 cursor-pointer
          "
            aria-label="Video tiếp theo"
          >
            <ChevronDown size={22} className="text-white" />
          </motion.button>
        </div>
      </div>
    </MuteProvider>
  );
}
