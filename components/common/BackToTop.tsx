"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Lắng nghe sự kiện cuộn chuột để quyết định ẩn/hiện nút
  useEffect(() => {
    const toggleVisibility = () => {
      // Nếu cuộn xuống quá 500px thì hiện nút
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Cleanup event listener khi component unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Hàm xử lý cuộn mượt mà lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Cuộn lên đầu trang"
      className={cn(
        "fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-3 md:p-4 rounded-full",
        "glass-panel border border-border/50 text-foreground shadow-2xl",
        "transition-all duration-500 ease-in-out",
        "hover:-translate-y-2 hover:bg-brand-purple hover:text-white hover:border-brand-purple hover:shadow-[0_10px_30px_-10px_rgba(150,0,255,0.5)]",
        // Logic ẩn/hiện với hiệu ứng trượt từ dưới lên
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16 pointer-events-none",
      )}
    >
      <ArrowUp size={24} strokeWidth={2.5} />
    </button>
  );
}
