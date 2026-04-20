import { BookOpen, Book, Mail, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Danh sách link nhanh ở Footer
const quickLinks = [
  { name: "Căn Cứ Lý Luận", href: "#theoretical-basis" },
  { name: "Phân Tích Nhận Định", href: "#statement-analysis" },
  { name: "Tiêu Chí Đánh Giá", href: "#evaluation-criteria" },
  { name: "Liên Hệ Thực Tiễn", href: "#historical-timeline" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/50 bg-background/80 backdrop-blur-xl relative z-10 overflow-hidden mt-20">
      {/* Hiệu ứng ánh sáng nền mờ ở Footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Cột 1: Thông tin nhóm & Môn học */}
          <div className="flex flex-col gap-4">
            <a href="#hero" className="flex items-center gap-2 group w-fit">
              <div className="p-2 rounded-lg bg-brand-purple/20 text-brand-purple">
                <BookOpen size={24} />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-foreground">
                Nhóm <span className="text-brand-purple">2</span>
              </span>
            </a>
            <p className="text-muted-foreground leading-relaxed mt-2 max-w-sm">
              Sản phẩm nghiên cứu sáng tạo thuộc học phần Triết học Mác - Lênin
              (MLN131). Phân tích và ứng dụng lý luận vào thực tiễn con đường đi
              lên Chủ nghĩa xã hội tại Việt Nam.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium w-fit mt-2">
              <span className="text-brand-crimson">🎓 Khóa K18 HCM</span>
            </div>
          </div>

          {/* Cột 2: Điều hướng nhanh */}
          <div className="flex flex-col gap-4 md:items-center">
            <h4 className="text-lg font-bold text-foreground">
              Cấu trúc bài luận
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-brand-purple transition-colors inline-flex items-center gap-2 text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-purple/50" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Liên hệ & Tài nguyên */}
          <div className="flex flex-col gap-4 md:items-end">
            <h4 className="text-lg font-bold text-foreground">Tài nguyên</h4>
            <p className="text-muted-foreground text-sm md:text-right">
              Mã nguồn giao diện (FE) được phát triển hoàn toàn bằng Next.js 15,
              Tailwind CSS v4 và ứng dụng kiến trúc Feature-based.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="#"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                aria-label="GitHub Repository"
              >
                <Book size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                aria-label="Email Contact"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Thanh Bản Quyền dưới cùng */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 text-sm text-muted-foreground gap-4">
          <p>© {currentYear} Bản quyền thuộc về Nhóm 2. Đồ án MLN131.</p>
          <p className="flex items-center gap-1.5">
            Phát triển với{" "}
            <Heart
              size={14}
              className="text-brand-crimson animate-pulse"
              fill="currentColor"
            />{" "}
            và công nghệ Web hiện đại
          </p>
        </div>
      </div>
    </footer>
  );
}
