"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Danh sách 3 hình ảnh cho Banner
// Hình 1 là link Cloudinary của bạn, Hình 2 & 3 là ảnh abstract (trừu tượng) tông đỏ/tím phù hợp với web
const CAROUSEL_IMAGES = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dratbz8bh/image/upload/v1769312729/3_bh4lfz.jpg",
    alt: "Bối cảnh lịch sử và triết học",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dratbz8bh/image/upload/v1765771681/le_nin_1716281116170_izc8la.jpg",
    alt: "Không gian đa chiều trừu tượng",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg",
    alt: "Chuyển động và đổi mới",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Xử lý tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1,
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Khối Hình Ảnh (Render toàn bộ nhưng chỉ hiện thị ảnh có index tương ứng) */}
      {CAROUSEL_IMAGES.map((img, index) => (
        <div
          key={img.id}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            index === currentIndex
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-105 z-0",
          )}
        >
          {/* Lớp phủ đen/gradient để làm nổi bật chữ */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-10" />
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Nội dung Content (Cố định ở giữa) */}
      <div className="relative z-20 glass-panel p-8 md:p-12 md:px-20 rounded-2xl text-center max-w-5xl mx-4 shadow-2xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full text-brand-purple bg-brand-purple/10 border border-brand-purple/20">
          Nghiên cứu sáng tạo
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gradient mb-6 uppercase tracking-tight drop-shadow-lg">
          Chủ Nghĩa Xã Hội
        </h1>
        <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-3xl drop-shadow">
          Phân tích nhận định về con đường đi lên chủ nghĩa xã hội tại Việt Nam
          qua lăng kính lý luận Mác - Lênin và thời kỳ quá độ.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="#theoretical-basis"
            className="px-8 py-3 rounded-full bg-brand-purple text-white font-medium hover:bg-brand-purple/80 transition-colors shadow-lg shadow-brand-purple/20"
          >
            Khám phá ngay
          </a>
        </div>
      </div>

      {/* Nút điều hướng Trái/Phải */}
      <div className="absolute z-30 bottom-10 right-10 flex gap-3">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors text-white"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thanh Progress Indicator (Dots) */}
      <div className="absolute z-30 bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === currentIndex
                ? "w-8 bg-brand-purple"
                : "w-3 bg-white/30 hover:bg-white/50",
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
