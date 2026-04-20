"use client";

import {
  Bot,
  Sparkles,
  PenTool,
  Music,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dữ liệu báo cáo sử dụng AI trong đồ án
const aiUsageLogs = [
  {
    id: "ai-llm",
    tool: "Gemini / ChatGPT",
    category: "Phân tích & Lập trình",
    icon: Bot,
    color: "text-brand-purple",
    bgColor: "bg-brand-purple/10",
    borderColor: "border-brand-purple/30",
    tasks: [
      "Hỗ trợ phân tích, tổng hợp lý luận triết học Mác - Lênin.",
      "Tối ưu hóa cấu trúc lập luận 'Đúng/Sai' cho logic và chặt chẽ.",
      "Tạo bộ khung source code Next.js và các component Tailwind CSS.",
    ],
    contribution: 40, // Phần trăm đóng góp ước tính
  },
  {
    id: "ai-design",
    tool: "AI Design Tools (Figma AI / v0)",
    category: "Thiết kế UI/UX",
    icon: PenTool,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    tasks: [
      "Lên ý tưởng bố cục Feature-based và prototyping giao diện.",
      "Tạo dải màu Gradient (Mesh) và hiệu ứng Glassmorphism.",
      "Gợi ý UX cho các khối nội dung Accordion và Timeline.",
    ],
    contribution: 25,
  },
  {
    id: "ai-music",
    tool: "Suno AI",
    category: "Sáng tạo Audio/Media",
    icon: Music,
    color: "text-brand-crimson",
    bgColor: "bg-brand-crimson/10",
    borderColor: "border-brand-crimson/30",
    tasks: [
      "Sáng tác nhạc nền (background music) cho video phóng sự/podcast của nhóm.",
      "Tạo hiệu ứng âm thanh minh họa cho các mốc lịch sử.",
    ],
    contribution: 15,
  },
];

export default function AiIntegrationLog() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 relative z-10">
      {/* Tuyên bố trách nhiệm (Disclaimer) */}
      <div className="mb-12 p-6 md:p-8 rounded-2xl bg-secondary/30 border border-border/50 glass-panel flex flex-col md:flex-row gap-6 items-center">
        <div className="p-4 rounded-full bg-brand-purple/20 text-brand-purple shrink-0 animate-pulse">
          <Sparkles size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Tuyên bố minh bạch
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Nhóm 2 cam kết toàn bộ tư duy lý luận, cấu trúc bài làm và phán
            quyết cuối cùng hoàn toàn thuộc về trí tuệ con người. Các công cụ
            Trí tuệ nhân tạo (AI) chỉ được sử dụng dưới vai trò{" "}
            <span className="font-semibold text-foreground">
              Trợ lý kỹ thuật và Sáng tạo
            </span>{" "}
            nhằm tối ưu hóa thời gian và nâng cao chất lượng trải nghiệm trực
            quan của sản phẩm.
          </p>
        </div>
      </div>

      {/* Grid danh sách các công cụ AI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiUsageLogs.map((log) => {
          const Icon = log.icon;

          return (
            <div
              key={log.id}
              className={cn(
                "glass-panel rounded-2xl p-6 md:p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border",
                log.borderColor,
              )}
            >
              {/* Header Card */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={cn(
                    "p-3 rounded-xl shrink-0",
                    log.bgColor,
                    log.color,
                  )}
                >
                  <Icon size={24} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">
                    {log.tool}
                  </h4>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {log.category}
                  </span>
                </div>
              </div>

              {/* Danh sách công việc (Tasks) */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {log.tasks.map((task, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2
                      size={16}
                      className={cn("shrink-0 mt-0.5", log.color)}
                    />
                    <span className="leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>

              {/* Thanh mức độ đóng góp (Contribution Bar) */}
              <div className="mt-auto">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-muted-foreground">Mức độ hỗ trợ</span>
                  <span className={log.color}>{log.contribution}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      log.color.replace("text-", "bg-"),
                    )}
                    style={{ width: `${log.contribution}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
