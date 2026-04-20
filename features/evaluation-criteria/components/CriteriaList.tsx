"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import {
  Target,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dữ liệu 3 tiêu chí kèm hình ảnh minh họa thực tiễn
const criteriaData = [
  {
    id: "criterion-1",
    title: "Mục Tiêu Phát Triển",
    icon: Target,
    color: "text-brand-purple",
    bgColor: "bg-brand-purple",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg", // Ảnh nụ cười/con người hạnh phúc
    description:
      "Đích đến của sự phát triển không chỉ là tăng trưởng kinh tế, mà là nâng cao đời sống vật chất, tinh thần và vị thế làm chủ của con người.",
    points: [
      "Giải phóng con người",
      "Phát triển con người toàn diện",
      "Đảm bảo công bằng xã hội",
      "Lợi ích nhân dân",
    ],
  },
  {
    id: "criterion-2",
    title: "Tổ Chức Kinh Tế",
    icon: TrendingUp,
    color: "text-brand-crimson",
    bgColor: "bg-brand-crimson",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg", // Ảnh nụ cười/con người hạnh phúc
    description:
      "Sự tồn tại của kinh tế tư nhân không phải là tiêu chí phủ định. Quan trọng là toàn bộ nền kinh tế đang được định hướng phục vụ mục tiêu chung.",
    points: [
      "Phát triển lực lượng sản xuất hiện đại",
      "Xây dựng nền kinh tế phát triển cao",
      "Hướng tới chế độ công hữu",
      "Tổ chức và điều tiết vì lợi ích chung toàn xã hội",
    ],
  },
  {
    id: "criterion-3",
    title: "Chính Trị - Xã Hội",
    icon: ShieldCheck,
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg", // Ảnh nụ cười/con người hạnh phúc
    description:
      "Tiêu chí không nằm ở việc 'đã xóa sạch yếu tố cũ hay chưa', mà nằm ở việc xã hội đó đang vận động theo hướng nào, phục vụ lợi ích của ai.",
    points: [
      "Nhân dân lao động làm chủ",
      "Hướng tới tiến bộ và công bằng xã hội",
      "Xây dựng quan hệ xã hội mới",
      "Khắc phục tàn dư xã hội cũ",
    ],
  },
];

// --- COMPONENT CON: THẺ 3D TILT ---
const TiltCard = ({
  data,
  index,
}: {
  data: (typeof criteriaData)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Xử lý logic nghiêng thẻ 3D dựa trên vị trí chuột
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Vị trí chuột X trong thẻ
    const y = e.clientY - rect.top; // Vị trí chuột Y trong thẻ

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tính toán góc nghiêng (chia cho 15 để giảm độ gắt của góc nghiêng)
    const rotateX = -((y - centerY) / 15);
    const rotateY = (x - centerX) / 15;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 }); // Trả về vị trí cân bằng khi chuột rời đi
  };

  const Icon = data.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] rounded-3xl transition-transform duration-200 ease-out preserve-3d cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
      }}
    >
      {/* KHỐI NỘI DUNG CHÍNH (Chứa Ảnh nền và Text) */}
      <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl">
        {/* Hình ảnh nền (Bình thường là đen trắng mờ, Hover thì hiện màu và zoom lên) */}
        <Image
          src={data.image}
          alt={data.title}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-in-out",
            isHovered
              ? "scale-110 opacity-60 grayscale-0"
              : "scale-100 opacity-20 grayscale",
          )}
        />

        {/* Lớp phủ Gradient để dễ đọc chữ */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            isHovered
              ? "bg-gradient-to-t from-background via-background/80 to-transparent"
              : "bg-gradient-to-t from-background via-background/90 to-background/50",
          )}
        />

        {/* Nội dung Text */}
        <div className="absolute inset-0 p-8 flex flex-col z-10 translate-z-50">
          <div className="flex justify-between items-start mb-auto">
            <span
              className="text-6xl font-black text-white/5 select-none transition-all duration-500"
              style={{ transform: isHovered ? "translateZ(30px)" : "none" }}
            >
              0{index + 1}
            </span>
            <div
              className={cn(
                "p-3 rounded-2xl transition-all duration-500",
                isHovered
                  ? cn(
                      data.bgColor,
                      "text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]",
                    )
                  : "bg-secondary/50 text-muted-foreground backdrop-blur-md",
              )}
            >
              <Icon size={28} strokeWidth={isHovered ? 2.5 : 1.5} />
            </div>
          </div>

          <div
            style={{ transform: isHovered ? "translateZ(40px)" : "none" }}
            className="transition-transform duration-500"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 drop-shadow-lg">
              {data.title}
            </h3>
            <p
              className={cn(
                "text-foreground/80 leading-relaxed text-sm md:text-base transition-all duration-500 mb-6",
                isHovered
                  ? "opacity-100 line-clamp-none"
                  : "opacity-70 line-clamp-2",
              )}
            >
              {data.description}
            </p>

            {/* Danh sách List (Chỉ hiện rõ khi hover) */}
            <ul
              className={cn(
                "space-y-2 transition-all duration-500 transform",
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 absolute pointer-events-none",
              )}
            >
              {data.points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm font-medium text-foreground/90"
                >
                  <CheckCircle2
                    size={16}
                    className={cn("mt-0.5 shrink-0", data.color)}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CriteriaList() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col relative z-10">
      {/* Grid chứa 3 thẻ 3D */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {criteriaData.map((criterion, index) => (
          <TiltCard key={criterion.id} data={criterion} index={index} />
        ))}
      </div>

      {/* Lời chốt (Câu chốt cuối bài) thiết kế dạng thanh nổi bật */}
      <div className="mt-16 relative overflow-hidden p-8 md:p-10 rounded-3xl glass-card border-brand-purple/30 group">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/30 via-brand-purple/20 to-brand-crimson/30 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="p-4 rounded-full bg-brand-purple/20 text-brand-purple shrink-0">
            <Target size={40} className="group-hover:animate-spin-slow" />
          </div>
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed flex-1">
            Vấn đề không phải là{" "}
            <span className="font-bold text-brand-crimson">
              &quot;Còn hay không còn ngay lập tức kinh tế tư nhân và phân hóa thu nhập&quot;
            </span>{" "}
            mà là {" "}
            <span className="font-bold text-brand-purple">
              &quot;Xã hội đó đang chuyển hóa theo hướng nào, dưới sự định hướng nào và nhằm mục tiêu gì&quot;
            </span>
          </p>
          <button className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-foreground text-background hover:scale-110 transition-transform">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
