import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BackToTop from "@/components/common/BackToTop";
import BackgroundElements from "@/components/common/BackgroundElements";

// Thiết lập phông chữ Geist với thuộc tính display swap để tránh giật giao diện khi load
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata chuyên nghiệp cho dự án Triết học
export const metadata: Metadata = {
  title: "Chủ Nghĩa Xã Hội | Nghiên Cứu Sáng Tạo - Nhóm 2",
  description:
    "Website phân tích lý luận về chủ nghĩa xã hội và thời kỳ quá độ tại Việt Nam - Học phần Triết học Mác-Lênin (MLN131)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-brand-purple/30 selection:text-white">
        <BackgroundElements />
        <div className="relative flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1 flex flex-col">{children}</main>

          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
