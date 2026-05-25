"use client";

import {
  Home,
  Compass,
  Upload,
  MessageCircle,
  User,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export default function BottomNav() {
  const navItems: NavItem[] = [
    { icon: <Home size={22} />, label: "Trang chủ", isActive: true },
    { icon: <Compass size={22} />, label: "Khám phá" },
    { icon: <Upload size={22} />, label: "Tạo" },
    { icon: <MessageCircle size={22} />, label: "Hộp thư" },
    { icon: <User size={22} />, label: "Hồ sơ" },
  ];

  return (
    <nav
      id="bottom-nav"
      className="
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        flex items-center justify-around
        h-[var(--bottomnav-height)]
        bg-black/90 backdrop-blur-xl
        border-t border-white/10
      "
    >
      {navItems.map((item, index) => (
        <button
          key={index}
          id={`bottomnav-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
          className={`
            flex flex-col items-center justify-center gap-0.5
            py-1 px-3
            transition-all duration-200
            ${item.isActive
              ? "text-white"
              : "text-text-secondary hover:text-white/80"
            }
          `}
        >
          {/* Icon điều hướng */}
          <span
            className={`
              transition-transform duration-200
              ${item.isActive ? "scale-110" : ""}
            `}
          >
            {item.icon}
          </span>
          {/* Nhãn text bên dưới icon */}
          <span className="text-[10px] font-medium leading-tight">
            {item.label}
          </span>

          {/* Chấm tròn nhỏ đánh dấu mục đang active */}
          {item.isActive && (
            <span className="absolute -bottom-0 w-1 h-1 rounded-full bg-accent" />
          )}
        </button>
      ))}
    </nav>
  );
}
