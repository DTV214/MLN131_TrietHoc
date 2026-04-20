"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Quote,
  XOctagon,
  ScanSearch,
  AlertTriangle,
  Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function VerdictAlert() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "result">(
    "idle",
  );

  const handleScan = () => {
    setScanState("scanning");
    // Giả lập thời gian AI/Hệ thống phân tích trong 2.5 giây
    setTimeout(() => {
      setScanState("result");
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto z-10 relative">
      {/* KHỐI TRÍCH DẪN & MÔ PHỎNG PHÂN TÍCH */}
      <div className="relative w-full glass-card p-1 rounded-3xl overflow-hidden shadow-2xl">
        {/* Ảnh nền mờ cho khối phân tích (tạo cảm giác công nghệ/logic) */}
        <div className="absolute inset-0 opacity-20 -z-10 mix-blend-luminosity">
          <Image
            src="https://res.cloudinary.com/dratbz8bh/image/upload/v1765768350/BAS1151_20-_20Kinh_20t_E1_BA_BF_20ch_C3_ADnh_20tr_E1_BB_8B_20M_C3_A1c-L_C3_AAnin_xsdptv.jpg"
            alt="Mạng lưới logic"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8 md:p-12 relative overflow-hidden bg-background/80 backdrop-blur-xl rounded-[1.3rem]">
          {/* Nút bấm tiến hành phân tích */}
          {scanState === "idle" && (
            <div className="absolute inset-0 z-20 bg-background/40 backdrop-blur-sm flex flex-col items-center justify-center transition-opacity duration-500">
              <button
                onClick={handleScan}
                className="group relative px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Fingerprint
                    size={24}
                    className="group-hover:animate-pulse"
                  />
                  Kết luận của nhóm
                </span>
                <div className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </button>
            </div>
          )}

          {/* Tia Laser quét (Chỉ hiện khi đang scanning) */}
          {scanState === "scanning" && (
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-crimson shadow-[0_0_20px_5px_rgba(255,0,0,0.5)] z-20 animate-[scan_2.5s_ease-in-out_forwards]" />
          )}

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-brand-navy/10 dark:bg-white/5 p-6 rounded-full shrink-0 relative">
              <Quote size={40} className="text-brand-purple" />
              {scanState === "scanning" && (
                <ScanSearch
                  size={40}
                  className="absolute top-6 left-6 text-brand-crimson animate-ping"
                />
              )}
            </div>

            <p className="text-xl md:text-2xl italic font-medium text-foreground leading-relaxed relative">
              Quan điểm: Theo chủ nghĩa Mác - Lênin, chừng nào{" "}
              {/* Cụm từ có lỗi logic sẽ bị bôi đỏ khi có kết quả */}
              <span
                className={cn(
                  "transition-all duration-700 rounded-md px-1",
                  scanState === "result"
                    ? "bg-brand-crimson/20 text-brand-crimson font-bold border-b-2 border-brand-crimson"
                    : "",
                )}
              >
                kinh tế tư nhân còn tồn tại
              </span>{" "}
              và người lao động còn bị{" "}
              <span
                className={cn(
                  "transition-all duration-700 delay-300 rounded-md px-1",
                  scanState === "result"
                    ? "bg-brand-crimson/20 text-brand-crimson font-bold border-b-2 border-brand-crimson"
                    : "",
                )}
              >
                phân hóa thu nhập
              </span>
              , thì chứng tỏ Việt Nam{" "}
              <strong
                className={cn(
                  "transition-colors duration-1000",
                  scanState === "result" ? "text-brand-crimson" : "",
                )}
              >
                chưa thực sự đi theo con đường xã hội chủ nghĩa
              </strong>
              .
            </p>
          </div>
        </div>
      </div>

      {/* KHỐI PHÁN QUYẾT BÙNG NỔ (Chỉ hiện ra sau khi phân tích xong) */}
      <div
        className={cn(
          "flex flex-col items-center gap-6 p-8 md:p-12 rounded-3xl w-full relative overflow-hidden transition-all duration-1000 transform origin-top",
          scanState === "result"
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-10 pointer-events-none absolute",
          "bg-gradient-to-br from-brand-crimson/20 via-background to-background border-2 border-brand-crimson/50",
          "shadow-[0_0_80px_-20px_rgba(200,0,0,0.4)]",
        )}
      >
        {/* Watermark "SAI" chìm khổng lồ ở background */}
        <span className="absolute -right-10 -bottom-20 text-[200px] font-black text-brand-crimson opacity-5 select-none pointer-events-none">
          SAI
        </span>

        {/* Icon dập xuống với hiệu ứng rung (Bounce) */}
        <div className="bg-brand-crimson text-white p-5 rounded-full shrink-0 shadow-2xl animate-[bounce_1s_ease-out]">
          <XOctagon size={48} strokeWidth={2.5} />
        </div>

        <div className="text-center max-w-3xl z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-crimson/10 border border-brand-crimson/20 text-brand-crimson text-sm font-bold uppercase tracking-widest mb-6">
            <AlertTriangle size={16} />
            Kết luận từ nhóm
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight uppercase mb-6 drop-shadow-md">
            Phát biểu trên là <span className="text-brand-crimson">SAI</span>
          </h3>
          
        </div>
      </div>

      {/* Định nghĩa keyframe cho tia laser quét trong file CSS nội bộ của component */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scan {
          0% { top: 0; opacity: 1; }
          50% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
      `,
        }}
      />
    </div>
  );
}
