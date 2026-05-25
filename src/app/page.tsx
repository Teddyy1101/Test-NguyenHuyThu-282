import VideoFeed from "@/components/video/VideoFeed";

/**
 * Trang chủ của ứng dụng VidShort.
 *
 * Render component VideoFeed chiếm toàn bộ chiều cao khả dụng.
 * VideoFeed sẽ hiển thị danh sách video cuộn dọc với CSS Scroll Snap.
 *
 * Đây là Server Component (mặc định trong App Router).
 * Các component con như VideoFeed, VideoCard sẽ là Client Component
 * vì chúng cần sử dụng state, ref, và các event handler.
 */
export default function Home() {
  return (
    <div className="h-full w-full">
      {/* Component VideoFeed chứa toàn bộ danh sách video */}
      <VideoFeed />
    </div>
  );
}
