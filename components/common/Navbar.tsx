"use client";

import { useState, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

// Danh sách các mục điều hướng dựa theo các Section đã định nghĩa ở page.tsx
const navLinks = [
  { name: "Trang Chủ", href: "#hero" },
  { name: "Căn Cứ Lý Luận", href: "#theoretical-basis" },
  { name: "Phân Tích Nhận Định", href: "#statement-analysis" },
  { name: "Tiêu Chí Đánh Giá", href: "#evaluation-criteria" },
  { name: "Thực Tiễn VN", href: "#historical-timeline" },
  { name: "AI Usage", href: "#ai-usage" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Hiệu ứng lắng nghe sự kiện cuộn chuột để thay đổi background Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        // Tối ưu hóa background: Khi cuộn xuống, nền đục 95% và làm mờ mạnh để chữ không bị chìm
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-border/50 py-3 shadow-md"
          : "bg-transparent border-transparent py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Tên Nhóm */}
        <a
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="p-2 rounded-lg bg-brand-purple/20 text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
            <BookOpen size={24} />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-foreground">
            Nhóm <span className="text-brand-purple">2</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              // Chữ được làm đậm hơn (font-semibold) và màu sắc tương phản tốt hơn (text-foreground/80)
              className="text-sm font-semibold text-foreground/80 hover:text-brand-purple transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-brand-purple after:transition-all hover:after:w-full py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/50 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col items-center py-6 gap-6 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-foreground/80 hover:text-brand-purple transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
