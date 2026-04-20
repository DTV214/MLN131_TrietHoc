"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Flag,
  Lightbulb,
  TrendingUp,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dữ liệu mạng lưới lịch sử (Sử dụng đồng nhất 1 link ảnh Giáo trình theo yêu cầu)
const timelineEvents = [
  {
    id: "event-1",
    year: "1986",
    title: "Khởi Xướng Đổi Mới",
    icon: Lightbulb,
    color: "text-brand-crimson",
    bgColor: "bg-brand-crimson",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg",
    description:
      "Đại hội VI của Đảng Cộng sản Việt Nam khởi xướng công cuộc Đổi Mới toàn diện. Chuyển từ nền kinh tế kế hoạch hóa tập trung bao cấp sang nền kinh tế hàng hóa nhiều thành phần.",
  },
  {
    id: "event-2",
    year: "Quy Luật",
    title: "Kim Chỉ Nam Thời Đại",
    icon: Flag,
    color: "text-brand-purple",
    bgColor: "bg-brand-purple",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg",
    description:
      "Độc lập dân tộc gắn liền với chủ nghĩa xã hội được khẳng định là quy luật xuyên suốt của cách mạng Việt Nam, thích ứng linh hoạt với điều kiện thời đại ngày nay.",
  },
  {
    id: "event-3",
    year: "Phương Pháp",
    title: "Cải Biến Từng Bước",
    icon: RefreshCw,
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg",
    description:
      "Con đường đi lên CNXH không phải là sự phủ định sạch trơn mọi yếu tố cũ, mà là quá trình cải biến từng bước đầy biện chứng, sử dụng chủ nghĩa tư bản nhà nước như một khâu trung gian.",
  },
  {
    id: "event-4",
    year: "Hiện Tại",
    title: "Định Hướng Quỹ Đạo",
    icon: TrendingUp,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg",
    description:
      "Tập trung phát triển mạnh mẽ lực lượng sản xuất, xây dựng quan hệ sản xuất tiến bộ, phù hợp và định hướng toàn bộ tiến trình hội nhập quốc tế theo mục tiêu XHCN.",
  },
];

export default function AnimatedTimeline() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto py-16 relative z-10">
      {/* TRỤC THỜI GIAN TRUNG TÂM */}
      <div className="absolute left-[40px] md:left-1/2 top-0 bottom-0 w-1 bg-border/50 -translate-x-1/2 rounded-full z-0 overflow-hidden">
        <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-brand-purple to-transparent animate-[scan-vertical_4s_ease-in-out_infinite]" />
      </div>

      <div className="flex flex-col gap-8 md:gap-16 relative z-10">
        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          const isEven = index % 2 === 0;
          const isHovered = hoveredNode === event.id;

          return (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredNode(event.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={cn(
                "relative flex flex-col md:flex-row items-start md:items-center w-full group cursor-pointer transition-all duration-500",
                isEven ? "md:flex-row-reverse" : "",
              )}
            >
              {/* ĐIỂM NEO (NODE) */}
              <div className="absolute left-[40px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20 mt-6 md:mt-0">
                <div
                  className={cn(
                    "absolute rounded-full transition-all duration-500",
                    event.bgColor,
                    isHovered
                      ? "w-20 h-20 opacity-30 animate-ping"
                      : "w-12 h-12 opacity-10",
                  )}
                />
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-4 border-background shadow-xl transition-all duration-500 text-white",
                    event.bgColor,
                    isHovered ? "scale-125 rotate-12" : "scale-100",
                  )}
                >
                  <Icon size={20} strokeWidth={2.5} />
                </div>
              </div>

              {/* KHỐI NỘI DUNG (THẺ THÔNG TIN - Fix Giật Lag) */}
              <div
                className={cn(
                  "w-full md:w-1/2 pl-24 pr-4 md:px-12",
                  isEven ? "md:text-right" : "text-left",
                )}
              >
                <div
                  className={cn(
                    "relative glass-card overflow-hidden rounded-3xl transition-all duration-500 border p-6 md:p-8 min-h-[220px] flex flex-col justify-center",
                    isHovered
                      ? "shadow-2xl translate-y-[-5px] border-white/30"
                      : "shadow-md border-white/5",
                  )}
                >
                  {/* Bức Ảnh Giáo trình ở dạng Background (Tuyệt đối không làm đổi layout) */}
                  <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className={cn(
                        "object-cover transition-all duration-1000 ease-out",
                        isHovered
                          ? "scale-100 opacity-20 grayscale-0"
                          : "scale-110 opacity-[0.03] grayscale",
                      )}
                    />
                    {/* Overlay tạo độ chuyển màu mượt mà để chữ luôn dễ đọc */}
                    <div
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700",
                        isEven
                          ? "bg-gradient-to-l from-background/40 via-background/90 to-background"
                          : "bg-gradient-to-r from-background/40 via-background/90 to-background",
                      )}
                    />
                  </div>

                  {/* Khu vực Chữ (Luôn cố định vị trí) */}
                  <div className="relative z-10">
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 transition-colors",
                        isHovered
                          ? cn(event.bgColor, "text-white shadow-lg")
                          : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {event.year}
                    </div>

                    <h3
                      className={cn(
                        "text-2xl font-bold mb-3 transition-colors duration-300",
                        isHovered ? event.color : "text-foreground",
                      )}
                    >
                      {event.title}
                    </h3>

                    <p className="text-foreground/80 leading-relaxed text-base">
                      {event.description}
                    </p>

                    <div
                      className={cn(
                        "mt-6 flex items-center gap-2 text-sm font-bold transition-all duration-300",
                        isHovered
                          ? cn(event.color, "opacity-100 translate-x-0")
                          : "opacity-0 -translate-x-4 pointer-events-none",
                        isEven ? "md:justify-end" : "justify-start",
                      )}
                    >
                      Khám phá giai đoạn này{" "}
                      <ChevronRight size={16} className="animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `,
        }}
      />
    </div>
  );
}
