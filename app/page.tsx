import HeroCarousel from "@/features/hero/components/HeroCarousel";
import ConceptCards from "@/features/theoretical-basis/components/ConceptCards";
import FlipbookModel from "@/features/theoretical-basis/components/FlipbookModel";
import VerdictAlert from "@/features/statement-analysis/components/VerdictAlert";
import ArgumentAccordion from "@/features/statement-analysis/components/ArgumentAccordion";
import CriteriaList from "@/features/evaluation-criteria/components/CriteriaList";
import AnimatedTimeline from "@/features/historical-timeline/components/AnimatedTimeline";
import AiIntegrationLog from "@/features/ai-usage/components/AiIntegrationLog";
import AiVideoShowcase from "@/features/statement-analysis/components/AiVideoShowcase";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* SECTION 1: Phần Mở Đầu (Hero Banner) */}
      <section
        id="hero"
        className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Lớp nền mờ giả lập làm nền cho Carousel */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 to-background -z-10" />

        {/* Render Carousel Banner */}
        <HeroCarousel />
      </section>

      {/* SECTION 2: Căn Cứ Lý Luận */}
      <section
        id="theoretical-basis"
        className="w-full min-h-screen py-24 px-6 md:px-12 flex flex-col items-center"
      >
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-12 text-center">
            Căn Cứ Lý Luận
          </h2>

          <div className="flex flex-col gap-12">
            <ConceptCards />
            <FlipbookModel />
          </div>
        </div>
      </section>

      {/* SECTION 3: Phân Tích Nhận Định (Đúng/Sai) */}
      <section
        id="statement-analysis"
        className="w-full min-h-screen py-24 px-6 md:px-12 flex flex-col items-center bg-secondary/30"
      >
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-12 text-center">
            Phân Tích Nhận Định
          </h2>

          <div className="flex flex-col gap-12">
            <AiVideoShowcase />
            <VerdictAlert />
            <ArgumentAccordion />
          </div>
        </div>
      </section>

      {/* SECTION 4: Tiêu Chí Đánh Giá */}
      <section
        id="evaluation-criteria"
        className="w-full min-h-screen py-24 px-6 md:px-12 flex flex-col items-center"
      >
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-12 text-center">
            Tiêu Chí Đánh Giá
          </h2>

          <CriteriaList />
        </div>
      </section>

      {/* SECTION 5: Liên Hệ Thực Tiễn (Timeline) */}
      <section
        id="historical-timeline"
        className="w-full min-h-screen py-24 px-6 md:px-12 flex flex-col items-center bg-secondary/30"
      >
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-12 text-center">
            Liên Hệ Thực Tiễn
          </h2>

          <AnimatedTimeline />
        </div>
      </section>

      {/* SECTION 6: Tuyên Bố Sử Dụng AI (AI Usage) */}
      <section
        id="ai-usage"
        className="w-full py-24 px-6 md:px-12 flex flex-col items-center"
      >
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-12 text-center">
            Minh Bạch Ứng Dụng AI
          </h2>

          <AiIntegrationLog />
        </div>
      </section>
    </div>
  );
}
