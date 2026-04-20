"use client";

import {
  Settings,
  Hexagon,
  CircleDashed,
  Sparkles,
  Compass,
} from "lucide-react";

export default function BackgroundElements() {
  return (
    // Lớp wrapper fixed, pointer-events-none để không chặn các thao tác click chuột của người dùng
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {/* CÁC MẢNG SÁNG LÀM NỀN (Tạo độ sâu chìm/sáng) */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-purple/5 blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-crimson/5 blur-[120px]" />

      {/* CÁC ICON HOẠT HOẠ TRÔI NỔI */}
      {/* Bánh răng: Tượng trưng cho sự vận động của lực lượng sản xuất */}
      <Settings
        size={120}
        className="absolute top-[15%] left-[5%] text-brand-navy/10 dark:text-white/5 animate-float"
        strokeWidth={1}
      />

      {/* Lục giác: Tượng trưng cho cấu trúc xã hội */}
      <Hexagon
        size={180}
        className="absolute top-[40%] right-[10%] text-brand-purple/10 dark:text-brand-purple/10 animate-float-delayed"
        strokeWidth={0.5}
      />

      {/* Vòng tuần hoàn: Tượng trưng cho tính tất yếu khách quan */}
      <CircleDashed
        size={250}
        className="absolute bottom-[20%] left-[15%] text-brand-crimson/5 dark:text-brand-crimson/5 animate-float-slow"
        strokeWidth={1}
      />

      {/* Tia lửa/Sao: Tượng trưng cho sự đổi mới, sáng tạo */}
      <Sparkles
        size={80}
        className="absolute top-[70%] right-[25%] text-brand-purple/15 dark:text-white/5 animate-float"
        strokeWidth={1.5}
      />

      {/* La bàn: Tượng trưng cho định hướng XHCN */}
      <Compass
        size={150}
        className="absolute top-[5%] right-[30%] text-brand-navy/5 dark:text-brand-navy/20 animate-float-delayed"
        strokeWidth={1}
      />
    </div>
  );
}
