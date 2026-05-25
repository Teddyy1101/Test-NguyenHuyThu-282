"use client";

import {
  Home,
  Compass,
  Users,
  Video,
  MessageCircle,
  Settings,
  Flame,
} from "lucide-react";

interface SidebarMenuItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export default function Sidebar() {
  const menuItems: SidebarMenuItem[] = [
    { icon: <Home size={20} />, label: "Dành cho bạn", isActive: true },
    { icon: <Compass size={20} />, label: "Khám phá" },
    { icon: <Users size={20} />, label: "Đang theo dõi" },
    { icon: <Flame size={20} />, label: "Thịnh hành" },
    { icon: <Video size={20} />, label: "LIVE" },
    { icon: <MessageCircle size={20} />, label: "Tin nhắn" },
  ];

  return (
    <aside
      id="sidebar"
      className="
        hidden md:flex
        fixed top-0 left-0 bottom-0 z-40
        w-[var(--sidebar-width)]
        flex-col
        bg-white/[0.06] backdrop-blur-[20px] backdrop-saturate-[1.8]
        border-r border-white/[0.08]
        overflow-y-auto
      "
    >
      {/* LOGO / BRAND */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center shadow-lg shadow-accent/20">
          <Video size={18} className="text-white" />
        </div>
        {/* Tên ứng dụng */}
        <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Video
        </span>
      </div>

      {/* MENU CHÍNH */}
      <nav className="flex-1 py-3 px-2.5">
        {menuItems.map((item, index) => (
          <button
            key={index}
            id={`sidebar-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-sm font-medium
              transition-all duration-200
              mb-0.5
              ${item.isActive
                ? "bg-white/10 text-white shadow-sm"
                : "text-text-secondary hover:bg-white/5 hover:text-white"
              }
            `}
          >
            {/* Icon với hiệu ứng glow nhẹ khi active */}
            <span
              className={`
                transition-all duration-200
                ${item.isActive ? "text-accent drop-shadow-[0_0_8px_rgba(254,44,85,0.5)]" : ""}
              `}
            >
              {item.icon}
            </span>
            {/* Nhãn text */}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* FOOTER SIDEBAR */}
      <div className="px-2.5 py-3 border-t border-white/5">
        {/* Nút Cài đặt */}
        <button
          id="sidebar-settings"
          className="
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
            text-sm font-medium text-text-secondary
            hover:bg-white/5 hover:text-white
            transition-all duration-200
          "
        >
          <Settings size={20} />
          <span>Cài đặt</span>
        </button>

        {/* Thông tin phiên bản và bản quyền */}
        <div className="mt-3 px-3">
          <p className="text-[10px] text-text-secondary/50 leading-relaxed">
            © 2026 Video
            <br />
            <span className="text-text-secondary/30">v1.0.0</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
