import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";

/**
 * Cấu hình font chữ Geist Sans (cho text thông thường)
 * và Geist Mono (cho code / số liệu).
 * Được tải từ Google Fonts thông qua next/font để tối ưu hiệu suất.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata SEO cho ứng dụng.
 * Bao gồm tiêu đề và mô tả mặc định cho mọi trang.
 */
export const metadata: Metadata = {
  title: "VidShort - Xem Video Ngắn",
  description:
    "Khám phá hàng ngàn video ngắn thú vị. Trải nghiệm xem video cuộn dọc mượt mà, tương tự TikTok và YouTube Shorts.",
};

/**
 * RootLayout - Bố cục gốc của toàn bộ ứng dụng.
 *
 * Cấu trúc responsive:
 * - Desktop (>= 768px): Sidebar cố định bên trái (250px), nội dung chính có margin-left tương ứng.
 * - Mobile (< 768px): BottomNav cố định ở đáy (56px), nội dung chính chiếm toàn bộ chiều rộng.
 *
 * Phần nội dung chính (main) tự động điều chỉnh padding/margin để không bị đè lên
 * bởi các thanh điều hướng cố định.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-background text-foreground overflow-hidden">
        {/* Sidebar: chỉ hiển thị trên desktop (ẩn/hiện được xử lý trong component) */}
        <Sidebar />

        {/* BottomNav: chỉ hiển thị trên mobile (ẩn/hiện được xử lý trong component) */}
        <BottomNav />

        {/*
          Vùng nội dung chính:
          - Trên desktop: margin-left = chiều rộng sidebar (250px) để tránh bị đè.
          - Trên mobile: không có margin-left, nhưng chiều cao được trừ đi chiều cao BottomNav.
        */}
        <main
          id="main-content"
          className="
            h-full
            md:ml-[var(--sidebar-width)]
          "
        >
          {children}
        </main>
      </body>
    </html>
  );
}
