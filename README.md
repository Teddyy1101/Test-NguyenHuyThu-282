# TikTok Clone / Video Feed App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), featuring a TikTok-style infinite scrolling video feed.

## 🌟 Tính năng nổi bật & Logic hoạt động

### 1. Logic tự động Play/Pause khi cuộn (Scroll Snap & Intersection Observer)
Để tái tạo trải nghiệm lướt video mượt mà của TikTok, ứng dụng sử dụng sự kết hợp giữa giao diện (CSS) và logic (JavaScript):

- **Về mặt giao diện (CSS Scroll Snap)**: 
  Sử dụng thuộc tính `scroll-snap-type: y mandatory` trên khung chứa và `scroll-snap-align: start` trên từng video. CSS ép thanh cuộn không bao giờ dừng lơ lửng ở giữa 2 video; mỗi khi kết thúc thao tác vuốt, màn hình sẽ bị "hút" vừa khít vào 1 video duy nhất, chiếm trọn 100% viewport.
  
- **Về mặt logic (Intersection Observer API)**:
  Ứng dụng sử dụng custom hook (`useElementOnScreen`) để liên tục giám sát xem mỗi video đang chiếm bao nhiêu phần trăm diện tích trên màn hình. Mốc kích hoạt (threshold) được đặt ở mức **60%**:
  - Khi video mới cuộn vào và hiển thị **≥ 60%**, nó lập tức tự động chạy (`play()`).
  - Khi video cũ bị cuộn đi, diện tích hiển thị tụt xuống **< 60%**, nó sẽ lập tức tạm dừng (`pause()`).
  
Sự kết hợp này đảm bảo tại một thời điểm chỉ có video chính giữa màn hình đang phát, tiết kiệm tối đa tài nguyên và mang lại cảm giác chuyển đổi mượt mà.

### 2. Xử lý Trình duyệt chặn Autoplay (Autoplay Policy)
- Trình duyệt hiện đại mặc định chặn video tự phát có âm thanh.
- Nếu việc phát (`play()`) bị chặn, ứng dụng có cơ chế *fallback*: tự động **tắt tiếng (muted = true)**, đồng bộ với Global State để đổi icon cái loa thành tắt, và thử phát lại.
- Người dùng chỉ cần bấm bật âm thanh **1 lần duy nhất**, âm thanh sẽ áp dụng cho toàn bộ các video còn lại khi cuộn.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
