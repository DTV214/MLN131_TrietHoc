"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Book as BookIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Dữ liệu nội dung các trang sách
const pages = [
  {
    title: "Bìa Sách",
    isCover: true,
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg",
  },
  {
    chapter: "Chương 3",
    title: "Tính tất yếu khách quan",
    content:
      "Thời kỳ quá độ lên CNXH là tất yếu đối với mọi quốc gia. Đây là giai đoạn cải biến sâu sắc, triệt để xã hội cũ thành xã hội mới trên tất cả các lĩnh vực đời sống.",
    pageNumber: 1,
  },
  {
    chapter: "Đặc trưng",
    title: "Sự đan xen cũ - mới",
    content:
      "Trong thời kỳ này, các yếu tố của xã hội mới và tàn dư của xã hội cũ tồn tại đan xen, đấu tranh với nhau. Đặc biệt là sự tồn tại của nhiều thành phần kinh tế.",
    pageNumber: 2,
  },
  {
    chapter: "Việt Nam",
    title: "Quá độ gián tiếp",
    content:
      "Việt Nam đi lên CNXH từ một nước nông nghiệp lạc hậu, bỏ qua chế độ tư bản chủ nghĩa. Đây là sự lựa chọn phù hợp với quy luật lịch sử và thực tiễn đất nước.",
    pageNumber: 3,
  },
  {
    chapter: "Kết luận",
    title: "Mục tiêu cuối cùng",
    content:
      "Xây dựng một xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh, do nhân dân làm chủ, hướng tới sự giải phóng toàn diện con người.",
    pageNumber: 4,
  },
];

export default function FlipbookModel() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full flex flex-col items-center py-16 px-4 relative z-10">
      {/* Tiêu đề khu vực */}
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-lg bg-brand-purple/20 text-brand-purple">
          <BookIcon size={28} />
        </div>
        <h3 className="text-3xl font-bold text-foreground tracking-tight">
          Hệ Thống Trích Lục 3D
        </h3>
      </div>

      {/* KHÔNG GIAN 3D CỦA CUỐN SÁCH */}
      <div className="relative perspective-[2000px] w-full max-w-[900px] aspect-[1.4/1] md:aspect-[1.6/1]">
        {/* Container Sách */}
        <div className="relative w-full h-full preserve-3d transition-transform duration-700">
          {/* Gáy sách (Hiệu ứng 3D) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/40 via-black/10 to-black/40 z-30 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />

          {/* RENDER CÁC TRANG SÁCH */}
          <div className="flex w-full h-full shadow-2xl rounded-sm overflow-hidden border border-white/5">
            {/* TRANG TRÁI (Cố định hoặc hiển thị trang trước) */}
            <div className="w-1/2 h-full bg-white dark:bg-zinc-900 border-r border-black/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
              <div className="p-8 md:p-12 h-full flex flex-col justify-center items-center text-center">
                <div className="w-12 h-1 bg-brand-purple mb-6 rounded-full opacity-50" />
                <h4 className="text-xl font-bold text-muted-foreground italic mb-4">
                  Tư liệu tham khảo
                </h4>
                <p className="text-sm text-muted-foreground/60">
                  Sử dụng giáo trình Kinh tế chính trị Mác - Lênin làm nền tảng
                  đối chiếu thực tiễn.
                </p>
              </div>
            </div>

            {/* TRANG PHẢI (Nội dung thay đổi) */}
            <div
              className="w-1/2 h-full bg-[#fdfdfd] dark:bg-zinc-800 relative group cursor-pointer"
              onClick={nextPage}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

              {/* Nội dung trang thay đổi theo state */}
              {pages.map((page, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "absolute inset-0 p-8 md:p-12 flex flex-col transition-all duration-700 ease-in-out",
                    idx === currentPage
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-12 pointer-events-none",
                  )}
                >
                  {page.isCover ? (
                    <div className="relative w-full h-full rounded-sm overflow-hidden shadow-inner border border-black/10">
                      <img
                        src={page.image}
                        alt={page.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-end p-6">
                        <span className="text-white text-xs font-bold tracking-[0.2em] uppercase bg-brand-purple/80 px-3 py-1 rounded">
                          Bìa Tài Liệu
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <span className="text-brand-crimson font-bold text-xs tracking-widest uppercase mb-2">
                        {page.chapter}
                      </span>
                      <h5 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6 border-b border-black/5 pb-2">
                        {page.title}
                      </h5>
                      <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed italic">
                        {page.content}
                      </p>
                      <div className="mt-auto flex justify-between items-end">
                        <span className="text-4xl font-black text-black/5 dark:text-white/5 select-none">
                          {page.pageNumber}
                        </span>
                        <div className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">
                          Đồ án Nhóm 2 - 2026
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NÚT ĐIỀU KHIỂN (Lอย lên trên sách) */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-40">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="p-4 rounded-full glass-card hover:bg-brand-purple hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className="p-4 rounded-full glass-card hover:bg-brand-purple hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl border border-white/10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* CHỈ BÁO TIẾN TRÌNH ĐỌC */}
      <div className="mt-16 flex gap-2">
        {pages.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-1 transition-all duration-500 rounded-full",
              idx === currentPage ? "w-12 bg-brand-purple" : "w-3 bg-muted/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}
