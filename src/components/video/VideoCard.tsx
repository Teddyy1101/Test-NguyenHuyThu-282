"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { Video } from "@/types";
import { useElementOnScreen } from "@/hooks/useElementOnScreen";
import { useMuteState } from "@/hooks/useMuteState";
import VideoActions from "./VideoActions";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { isMuted, toggleMute } = useMuteState();
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [containerRef, isIntersecting] = useElementOnScreen({
    threshold: 0.6,
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isIntersecting) {
      videoElement.play().catch(() => {
        videoElement.muted = true;
        videoElement.play().catch(() => {
          setIsPlaying(false);
        });
      });
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  }, [isIntersecting]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.muted = isMuted;
  }, [isMuted]);

  const handleVideoClick = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement.play().catch(() => { });
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
    setShowPlayPauseIcon(true);
  }, []);

  const handleMuteToggle = useCallback(() => {
    toggleMute();
  }, [toggleMute]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      if (videoElement.duration) {
        const percent =
          (videoElement.currentTime / videoElement.duration) * 100;
        setProgress(percent);
      }
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        snap-item relative
        w-full
        h-[calc(100vh-var(--bottomnav-height))] md:h-screen
        flex items-center justify-center
        bg-black overflow-hidden
      "
    >
      <div
        className="
          relative w-full h-full
          md:w-auto md:h-full md:aspect-[9/16]
          md:rounded-2xl md:overflow-hidden
          md:shadow-2xl md:shadow-black/50
        "
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          loop
          playsInline
          preload="metadata"
          onClick={handleVideoClick}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />

        <AnimatePresence>
          {showPlayPauseIcon && (
            <motion.div
              key="play-pause-indicator"
              className="absolute top-1/2 left-1/2 pointer-events-none z-20"
              initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.1, 1, 1] }}
              transition={{ duration: 0.8, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
              onAnimationComplete={() => setShowPlayPauseIcon(false)}
            >
              <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                {isPlaying ? (
                  <Play size={30} className="text-white ml-1" />
                ) : (
                  <Pause size={30} className="text-white" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 right-14 z-20 p-4 pb-5 md:pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Tên tác giả */}
          <div className="flex items-center gap-2 mb-2">
            {/* Avatar giả định */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/20">
              {video.authorName.charAt(1).toUpperCase()}
            </div>
            <div>
              <h3 className="text-white font-bold text-sm drop-shadow-lg">
                {video.authorName}
              </h3>
            </div>
            {/* Nút Theo dõi */}
            <button className="ml-2 px-3 py-1 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-semibold transition-all duration-200 hover:scale-105">
              Theo dõi
            </button>
          </div>

          {/* Mô tả video */}
          <p className="text-white/90 text-xs leading-relaxed line-clamp-2 drop-shadow-md">
            {video.description}
          </p>

          {/* Nhạc nền giả định */}
          <div className="flex items-center gap-1.5 mt-2">
            <Music size={12} className="text-white/60" />
            <p className="text-white/50 text-[11px] truncate">
              Nhạc gốc - {video.authorName}
            </p>
          </div>
        </motion.div>
        {/* CÁC NÚT TƯƠNG TÁC*/}
        <div className="absolute bottom-20 right-2 z-20 md:bottom-16 md:right-3">
          <VideoActions initialLikes={video.likesCount} />
        </div>
        {/* NÚT BẬT/TẮT ÂM THANH */}
        <button
          id={`mute-toggle-${video.id}`}
          onClick={handleMuteToggle}
          className="
            absolute top-4 right-4 z-20
            w-9 h-9 rounded-full
            bg-black/30 backdrop-blur-sm
            flex items-center justify-center
            hover:bg-black/50
            transition-all duration-200
          "
          aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {isMuted ? (
            <VolumeX size={16} className="text-white/70" />
          ) : (
            <Volume2 size={16} className="text-white" />
          )}
        </button>
        {/* THANH TIẾN TRÌNH VIDEO (Progress Bar) */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
          {/* Thanh progress dùng Motion để animate width mượt mà */}
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
