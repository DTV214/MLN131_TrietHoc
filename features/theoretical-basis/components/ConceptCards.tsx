"use client";

import { useState } from "react";
import Image from "next/image";
import { Target, RefreshCcw, Info, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- COMPONENT PHỤ: Thẻ Hover Card giải thích thuật ngữ ---
const TermHoverCard = ({
  term,
  explanation,
}: {
  term: string;
  explanation: string;
}) => (
  <span className="relative group inline-block cursor-help">
    <span className="border-b border-dashed border-brand-purple text-foreground font-semibold">
      {term}
    </span>
    {/* Khối tooltip nổi lên khi hover */}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl glass-card opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
      <div className="flex items-start gap-2">
        <Info size={16} className="text-brand-purple shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/90 font-normal leading-relaxed">
          {explanation}
        </p>
      </div>
    </div>
  </span>
);

// --- DỮ LIỆU ZIG-ZAG ---
const zigZagData = [
  {
    id: "goal",
    title: "Mục Tiêu Cuối Cùng Của CNXH",
    icon: Target,
    color: "text-brand-purple",
    bgColor: "bg-brand-purple/10",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg", // Ảnh abstract về sự kết nối con người
    imageAlt: "Mục tiêu phát triển con người toàn diện",
    theoryContent: (
      <>
        Bản chất của CNXH không bị thu gọn vào một dấu hiệu kinh tế đơn lẻ. Mục
        tiêu cao cả nhất là{" "}
        <TermHoverCard
          term="giải phóng toàn diện"
          explanation="Giải phóng giai cấp, dân tộc, xã hội và con người khỏi ách áp bức, bóc lột."
        />
        , tạo điều kiện để con người phát triển tự do.
      </>
    ),
    practiceContent: (
      <>
        Tại Việt Nam, đích đến không chỉ là tăng trưởng GDP, mà là nâng cao vị
        thế làm chủ của nhân dân lao động, thực hiện{" "}
        <TermHoverCard
          term="công bằng xã hội"
          explanation="Đảm bảo mọi người dân đều được hưởng thành quả của sự phát triển kinh tế."
        />{" "}
        trong từng bước đi và chính sách.
      </>
    ),
  },
  {
    id: "transition",
    title: "Thời Kỳ Quá Độ Lên CNXH",
    icon: RefreshCcw,
    color: "text-brand-crimson",
    bgColor: "bg-brand-crimson/10",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg", // Ảnh Giáo trình của bạn
    imageAlt: "Giáo trình Kinh tế chính trị Mác - Lênin",
    theoryContent: (
      <>
        Là giai đoạn lịch sử tất yếu khách quan. Đặc trưng lớn nhất là sự đan
        xen giữa cái cũ và cái mới. Lênin khẳng định tất yếu còn tồn tại{" "}
        <TermHoverCard
          term="nhiều thành phần kinh tế"
          explanation="Bao gồm kinh tế nhà nước, tập thể, tư nhân, tư bản nước ngoài..."
        />{" "}
        và nhiều hình thức phân phối.
      </>
    ),
    practiceContent: (
      <>
        Đảng ta khẳng định: Xây dựng nền kinh tế thị trường định hướng XHCN.
        Chấp nhận sự tồn tại của kinh tế tư nhân và phân hóa thu nhập như một{" "}
        <TermHoverCard
          term="động lực phát triển"
          explanation="Kích thích sản xuất, huy động vốn nhàn rỗi và giải quyết việc làm trong thời kỳ quá độ."
        />{" "}
        ở hiện tại, nhưng được điều tiết bởi Nhà nước.
      </>
    ),
  },
];

export default function ConceptCards() {
  // Quản lý state cho Switch (chuyển đổi Lý thuyết / Thực tiễn) của từng thẻ
  const [activeTabs, setActiveTabs] = useState<
    Record<string, "theory" | "practice">
  >({
    goal: "theory",
    transition: "theory",
  });

  const toggleTab = (id: string, tab: "theory" | "practice") => {
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <div className="w-full flex flex-col gap-24 relative z-10 py-10">
      {zigZagData.map((item, index) => {
        const Icon = item.icon;
        const isEven = index % 2 === 0;
        const currentTab = activeTabs[item.id];

        return (
          <div
            key={item.id}
            className={cn(
              "flex flex-col md:flex-row items-center gap-12 lg:gap-20",
              isEven ? "" : "md:flex-row-reverse", // Đảo ngược vị trí (Zig-zag)
            )}
          >
            {/* Cột 1: Hình ảnh */}
            <div className="w-full md:w-1/2 relative group">
              {/* Khung viền kính mờ bao quanh ảnh */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-purple/20 to-brand-crimson/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card border border-white/10 shadow-2xl">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Lớp phủ nhẹ */}
                <div className="absolute inset-0 bg-background/10 mix-blend-overlay" />
              </div>
            </div>

            {/* Cột 2: Nội dung */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
              <div
                className={cn(
                  "inline-flex p-4 rounded-2xl mb-6",
                  item.bgColor,
                  item.color,
                )}
              >
                <Icon size={32} strokeWidth={1.5} />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
                {item.title}
              </h3>

              {/* Tương tác Switch: Lý thuyết / Thực tiễn */}
              <div className="flex bg-secondary/50 p-1 rounded-full mb-8 border border-border/50 backdrop-blur-sm">
                <button
                  onClick={() => toggleTab(item.id, "theory")}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    currentTab === "theory"
                      ? "bg-background text-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Lý thuyết Mác - Lênin
                </button>
                <button
                  onClick={() => toggleTab(item.id, "practice")}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    currentTab === "practice"
                      ? "bg-background text-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Thực tiễn Việt Nam
                </button>
              </div>

              {/* Khối hiển thị nội dung kèm hiệu ứng Fade */}
              <div className="relative min-h-[120px] w-full">
                <div
                  className={cn(
                    "absolute inset-0 text-lg text-muted-foreground leading-relaxed transition-all duration-500",
                    currentTab === "theory"
                      ? "opacity-100 translate-y-0 relative"
                      : "opacity-0 translate-y-4 absolute pointer-events-none",
                  )}
                >
                  {item.theoryContent}
                </div>
                <div
                  className={cn(
                    "absolute inset-0 text-lg text-muted-foreground leading-relaxed transition-all duration-500",
                    currentTab === "practice"
                      ? "opacity-100 translate-y-0 relative"
                      : "opacity-0 translate-y-4 absolute pointer-events-none",
                  )}
                >
                  {item.practiceContent}
                </div>
              </div>

              <button className="mt-8 group flex items-center gap-2 text-sm font-bold text-foreground hover:text-brand-purple transition-colors">
                Khám phá thêm về lập luận này
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
