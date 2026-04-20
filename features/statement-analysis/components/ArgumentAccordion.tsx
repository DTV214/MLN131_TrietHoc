"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, PieChart, EyeOff, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Dữ liệu 3 lý do "Vì sao sai" được nâng cấp với Hình ảnh và Từ khóa
const argumentsData = [
  {
    id: "arg-1",
    title: "Phủ nhận tính tất yếu của thời kỳ quá độ",
    icon: Clock,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-500",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg", // Ảnh về dòng thời gian
    content:
      "Theo Chương 3, thời kỳ quá độ lên CNXH là giai đoạn tất yếu. Trong giai đoạn đó, xã hội chưa thể lập tức xóa bỏ hết những yếu tố của xã hội cũ. Vì vậy, sự tồn tại của kinh tế tư nhân hay chênh lệch thu nhập không phải điều bất thường, càng không phải bằng chứng đủ để kết luận xã hội không đi theo CNXH.",
    keywords: ["Tất yếu khách quan", "Xã hội cũ đan xen", "Không bất thường"],
  },
  {
    id: "arg-2",
    title: "Đi ngược luận điểm về nhiều hình thức sở hữu",
    icon: PieChart,
    color: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-500",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg", // Ảnh về dòng thời gian
    content:
      "Trong thời kỳ quá độ tất yếu còn nhiều hình thức sở hữu, nhiều thành phần kinh tế và nhiều hình thức phân phối khác nhau. Nếu lý luận đã khẳng định như vậy, thì việc còn kinh tế tư nhân và còn phân hóa thu nhập chỉ là biểu hiện có thể có của thời kỳ quá độ, chứ không phải bằng chứng phủ định định hướng XHCN.",
    keywords: [
      "Nhiều thành phần kinh tế",
      "Đa hình thức phân phối",
      "Biểu hiện tất yếu",
    ],
  },
  {
    id: "arg-3",
    title: "Nhầm lẫn giữa hiện tượng bề mặt và bản chất",
    icon: EyeOff,
    color: "text-brand-purple",
    bgColor: "bg-brand-purple",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg", // Ảnh về dòng thời gian
    content:
      "Phát biểu đang lấy hai hiện tượng là còn kinh tế tư nhân và còn phân hóa thu nhập để đi đến một kết luận rất lớn: Việt Nam chưa thực sự đi theo con đường XHCN. Đây là một bước nhảy logic không vững. Bản chất con đường phải được đánh giá bằng mục tiêu phát triển, quỹ đạo vận động trong toàn bộ tiến trình lịch sử.",
    keywords: ["Bước nhảy logic", "Hiện tượng bề mặt", "Quỹ đạo vận động"],
  },
];

export default function ArgumentAccordion() {
  // Trạng thái lưu trữ luận điểm đang được chọn (Mặc định chọn cái đầu tiên)
  const [activeId, setActiveId] = useState<string>(argumentsData[0].id);

  // Lấy dữ liệu của luận điểm đang active
  const activeData =
    argumentsData.find((arg) => arg.id === activeId) || argumentsData[0];

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 relative z-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[500px]">
        {/* CỘT TRÁI: Danh sách các "Điểm neo" (Tabs) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          {argumentsData.map((arg, index) => {
            const Icon = arg.icon;
            const isActive = activeId === arg.id;

            return (
              <button
                key={arg.id}
                onClick={() => setActiveId(arg.id)}
                className={cn(
                  "relative flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300 overflow-hidden group",
                  isActive
                    ? "glass-card border-brand-purple/50 shadow-lg shadow-brand-purple/10 scale-105"
                    : "hover:bg-secondary/50 border border-transparent hover:border-border/50",
                )}
              >
                {/* Lớp nền mờ khi active */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 to-transparent -z-10" />
                )}

                <div
                  className={cn(
                    "p-3 rounded-xl shrink-0 transition-colors duration-300",
                    isActive
                      ? cn(arg.bgColor, "text-white shadow-md")
                      : cn("bg-secondary text-muted-foreground", arg.color),
                  )}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                </div>

                <div className="flex-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 block">
                    Luận điểm 0{index + 1}
                  </span>
                  <h4
                    className={cn(
                      "font-bold transition-colors duration-300 leading-snug",
                      isActive
                        ? "text-foreground text-lg"
                        : "text-muted-foreground text-base group-hover:text-foreground",
                    )}
                  >
                    {arg.title}
                  </h4>
                </div>

                {isActive && (
                  <ChevronRight
                    size={20}
                    className="text-brand-purple shrink-0 animate-pulse"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CỘT PHẢI: Nội dung chi tiết có hiệu ứng trượt (Slide-out) */}
        <div className="w-full lg:w-2/3 relative rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl flex flex-col">
          {/* Ảnh Cover có hiệu ứng Zoom chậm */}
          <div className="relative h-64 w-full overflow-hidden shrink-0">
            {/* key={activeData.id} giúp React force re-render, tạo lại animation mỗi lần chuyển tab */}
            <Image
              key={`img-${activeData.id}`}
              src={activeData.image}
              alt={activeData.title}
              fill
              className="object-cover animate-[kenburns_10s_ease-out_forwards]"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            {/* Overlay Gradient chuyển từ ảnh sang nội dung */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>

          {/* Nội dung Text */}
          <div className="relative flex-1 p-8 md:p-10 -mt-20 z-10 flex flex-col justify-end">
            <h3
              key={`title-${activeData.id}`}
              className="text-2xl md:text-3xl font-bold text-foreground mb-4 animate-[fade-in-up_0.5s_ease-out_forwards]"
            >
              {activeData.title}
            </h3>

            <p
              key={`desc-${activeData.id}`}
              className="text-lg text-foreground/80 leading-relaxed mb-8 animate-[fade-in-up_0.6s_ease-out_forwards]"
            >
              {activeData.content}
            </p>

            {/* Khối Từ khóa trọng tâm (Highlighted Keywords) */}
            <div
              key={`keys-${activeData.id}`}
              className="flex flex-wrap gap-3 mt-auto animate-[fade-in-up_0.7s_ease-out_forwards]"
            >
              <div className="w-full text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 mb-2">
                <Zap size={14} className="text-brand-purple" /> Từ khóa trọng
                tâm
              </div>
              {activeData.keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold border backdrop-blur-md",
                    "bg-brand-purple/10 border-brand-purple/30 text-brand-purple",
                    "hover:bg-brand-purple hover:text-white transition-colors cursor-default",
                  )}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation nội bộ (Kenburns = zoom & dịch chuyển ảnh) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes kenburns {
          0% { transform: scale(1) translateY(0); }
          100% { transform: scale(1.1) translateY(-2%); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
}
