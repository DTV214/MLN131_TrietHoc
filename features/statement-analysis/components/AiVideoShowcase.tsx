"use client";

import { useState } from "react";
import { Play, Sparkles, Volume2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AiVideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-6 relative z-10">
      {/* TIÊU ĐỀ DẪN NHẬP VIDEO */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-bold uppercase tracking-widest mb-4">
          <Sparkles size={16} />
          Trải nghiệm đa phương tiện
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-6">
          Video Tổng Quan Dự Án
        </h2>
        <p className="max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Được thuyết trình bởi{" "}
          <span className="text-foreground font-semibold">MC ảo AI</span>. Đoạn
          phim ngắn này sẽ tóm tắt lại toàn bộ mâu thuẫn giữa nhận định sai lầm
          và thực tiễn con đường XHCN tại Việt Nam.
        </p>
      </div>

      {/* KHUNG CHỨA VIDEO (CINEMATIC FRAME) */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden glass-card border border-white/10 shadow-[0_0_100px_-20px_rgba(150,0,255,0.2)] group bg-black">
        {/* Lớp nền mờ khi chưa phát video (Thumbnail) */}
        {!isPlaying ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            {/* Ảnh nền Thumbnail dùng đúng link Giáo trình của bạn */}
            <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
              <img
                src="https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg"
                alt="Video Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lớp Overlay đen mờ */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

            {/* Nút Play trung tâm */}
            <button
              onClick={() => setIsPlaying(true)}
              className="relative group/play flex items-center justify-center"
            >
              <div className="absolute w-24 h-24 bg-brand-purple/30 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-brand-purple text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(150,0,255,0.6)] group-hover/play:scale-110 transition-transform duration-300">
                <Play size={32} fill="currentColor" className="ml-1" />
              </div>
            </button>

            <span className="mt-6 text-white/90 font-bold tracking-widest uppercase text-sm animate-pulse drop-shadow-md">
              Nhấn để bắt đầu xem
            </span>
          </div>
        ) : (
          /* TRÌNH PHÁT VIDEO THỰC TẾ */
          <div className="absolute inset-0 z-30 bg-black flex items-center justify-center">
            {/* Thẻ Video HTML5 */}
            <video
              className="w-full h-full object-contain"
              src="https://res.cloudinary.com/dratbz8bh/video/upload/v1776699935/ChuNghiaXaHoi_2_qzvgwc.mp4"
              controls
              autoPlay
              playsInline
            />

            {/* Nút Tắt Video ở góc phải trên cùng */}
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/50 hover:bg-brand-crimson text-white backdrop-blur-md transition-colors shadow-lg z-40"
              aria-label="Đóng video"
            >
              <X size={24} />
            </button>
          </div>
        )}

        {/* Thanh trạng thái phía dưới (Dạng thanh Progress giả) */}
        {!isPlaying && (
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-30">
            <div
              className={cn(
                "h-full bg-brand-purple transition-all duration-1000",
                isPlaying ? "w-full" : "w-0",
              )}
            />
          </div>
        )}
      </div>

      {/* THÔNG TIN CHI TIẾT DƯỚI VIDEO (FOOTNOTE) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-4 p-5 rounded-2xl glass-card border-white/5">
          <Volume2 size={24} className="text-brand-purple shrink-0 mt-1" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Âm thanh sống động:</strong>{" "}
            Được tích hợp giọng đọc AI ElevenLabs giúp truyền tải nội dung mạch
            lạc và dễ tiếp cận hơn so với văn bản thuần túy.
          </p>
        </div>
        <div className="flex items-start gap-4 p-5 rounded-2xl glass-card border-white/5">
          <Info size={24} className="text-brand-crimson shrink-0 mt-1" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Lưu ý:</strong> Nội dung video
            tập trung giải thích sự khác biệt giữa kinh tế tư nhân trong thời kỳ
            quá độ và bản chất định hướng XHCN.
          </p>
        </div>
      </div>
    </div>
  );
}
