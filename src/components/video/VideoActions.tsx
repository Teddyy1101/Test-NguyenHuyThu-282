"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

interface VideoActionsProps {
  initialLikes: number;
}

function formatCount(count: number): string {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toString();
}

export default function VideoActions({ initialLikes }: VideoActionsProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(initialLikes);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [animKey, setAnimKey] = useState<number>(0);

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setAnimKey((prev) => prev + 1);
  };

  const handleSaveToggle = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* NÚT LIKE */}
      <motion.button
        id="btn-like"
        className="flex flex-col items-center gap-1 group"
        onClick={handleLikeToggle}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isLiked ? "Bỏ thích" : "Thích"}
      >
        <motion.div
          key={animKey}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm"
          animate={
            isLiked
              ? { scale: [1, 1.35, 0.9, 1.1, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Heart
            size={24}
            className={`
              transition-all duration-200
              ${isLiked
                ? "fill-accent text-accent drop-shadow-[0_0_10px_rgba(254,44,85,0.6)]"
                : "text-white group-hover:text-accent/70"
              }
            `}
          />
        </motion.div>
        {/* Hiển thị số lượt like đã format */}
        <span className="text-xs font-semibold text-white/90">
          {formatCount(likesCount)}
        </span>
      </motion.button>

      {/* NÚT BÌNH LUẬN */}
      <motion.button
        id="btn-comment"
        className="flex flex-col items-center gap-1 group"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Bình luận"
      >
        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm transition-colors duration-200 group-hover:bg-white/15">
          <MessageCircle
            size={24}
            className="text-white transition-colors duration-200 group-hover:text-blue-400"
          />
        </div>
        <span className="text-xs font-semibold text-white/90">
          {formatCount(Math.floor(initialLikes * 0.12))}
        </span>
      </motion.button>

      {/* NÚT CHIA SẺ */}
      <motion.button
        id="btn-share"
        className="flex flex-col items-center gap-1 group"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chia sẻ"
      >
        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm transition-colors duration-200 group-hover:bg-white/15">
          <Share2
            size={22}
            className="text-white transition-colors duration-200 group-hover:text-green-400"
          />
        </div>
        <span className="text-xs font-semibold text-white/90">Chia sẻ</span>
      </motion.button>

      {/* NÚT LƯU */}
      <motion.button
        id="btn-save"
        className="flex flex-col items-center gap-1 group"
        onClick={handleSaveToggle}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isSaved ? "Bỏ lưu" : "Lưu"}
      >
        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm transition-colors duration-200 group-hover:bg-white/15">
          <Bookmark
            size={22}
            className={`
              transition-all duration-200
              ${isSaved
                ? "fill-yellow-400 text-yellow-400"
                : "text-white group-hover:text-yellow-400/70"
              }
            `}
          />
        </div>
        <span className="text-xs font-semibold text-white/90">Lưu</span>
      </motion.button>
    </div>
  );
}
