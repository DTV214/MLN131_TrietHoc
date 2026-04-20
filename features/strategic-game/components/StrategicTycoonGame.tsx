"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Factory,
  Landmark,
  RotateCcw,
  Scale,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StatKey = "llsx" | "cbxh" | "ttkt";
type Stats = Record<StatKey, number>;

type Question = {
  title: string;
  desc: string;
  optA: string;
  optB: string;
  optC: string;
  optD: string;
  effectA: Stats;
  effectB: Stats;
  effectC: Stats;
  effectD: Stats;
};

const INITIAL_STATS: Stats = {
  llsx: 50,
  cbxh: 50,
  ttkt: 50,
};

const questions: Question[] = [
  {
    title: "Bài toán Khởi nghiệp",
    desc: "Nền kinh tế đang thiếu sức bật. Có đề xuất mở cửa hoàn toàn cho kinh tế tư nhân.",
    optA: "Tự do hóa 100%, tư nhân được làm mọi ngành nghề",
    effectA: { llsx: 20, ttkt: 20, cbxh: -20 },
    optB: "Cấm tư nhân, Nhà nước bao cấp để giữ công bằng",
    effectB: { llsx: -15, ttkt: -20, cbxh: 15 },
    optC: "Chỉ cho phép kinh doanh hộ gia đình, tiểu thủ công nghiệp",
    effectC: { llsx: 5, ttkt: 5, cbxh: 0 },
    optD: "Khuyến khích tư nhân, nhưng Nhà nước độc quyền các ngành trọng yếu (điện, an ninh)",
    effectD: { llsx: 15, ttkt: 10, cbxh: -5 },
  },
  {
    title: "Phân phối thu nhập",
    desc: "Thiếu hụt kỹ sư công nghệ cao. Chuyên gia nước ngoài đòi mức lương gấp 50 lần công nhân.",
    optA: "Trả theo yêu cầu thị trường để hút nhân tài bằng mọi giá",
    effectA: { llsx: 15, ttkt: 15, cbxh: -25 },
    optB: "Cào bằng lương, tối đa chỉ được gấp 3 lần để tránh tị nạnh",
    effectB: { llsx: -20, ttkt: -15, cbxh: 20 },
    optC: "Trả lương cao kèm điều kiện bắt buộc chuyển giao công nghệ cho nhân sự nội bộ",
    effectC: { llsx: 25, ttkt: 10, cbxh: -5 },
    optD: "Trả lương cao nhưng ép đóng 40% vào quỹ an sinh xã hội",
    effectD: { llsx: 5, ttkt: 5, cbxh: 5 },
  },
  {
    title: "Cổ phần hóa",
    desc: "Nhiều Doanh nghiệp Nhà nước (DNNN) ở các mảng như bia, sữa, giải trí đang kẹt vốn.",
    optA: "Thoái vốn 100% ở các ngành tiêu dùng không thiết yếu để lấy tiền đầu tư hạ tầng",
    effectA: { llsx: 15, ttkt: 25, cbxh: 0 },
    optB: "Tiếp tục dùng ngân sách bù lỗ để giữ quy mô DNNN",
    effectB: { llsx: -10, ttkt: -25, cbxh: 5 },
    optC: "Bán 49% vốn, Nhà nước vẫn giữ quyền quyết định",
    effectC: { llsx: 10, ttkt: 10, cbxh: -5 },
    optD: "Giữ 100% vốn nhưng thay đổi giám đốc, khoán doanh thu",
    effectD: { llsx: 5, ttkt: 0, cbxh: 5 },
  },
  {
    title: "Thuế thu nhập",
    desc: "Khoảng cách giàu nghèo tăng. Xuất hiện tình trạng doanh nghiệp lớn lách thuế, chuyển giá.",
    optA: "Miễn thuế thêm để kích thích giới chủ mở rộng đầu tư",
    effectA: { llsx: 15, ttkt: 20, cbxh: -30 },
    optB: "Siết chặt luật, chống chuyển giá, trốn thuế và thu hồi tài sản bất minh",
    effectB: { llsx: 5, ttkt: 15, cbxh: 25 },
    optC: "Áp dụng thuế thu nhập cá nhân lên tới 60% cho người giàu",
    effectC: { llsx: -10, ttkt: -15, cbxh: 20 },
    optD: "Đánh thuế tài sản (BĐS thứ 2), lấy tiền xây nhà ở xã hội",
    effectD: { llsx: 5, ttkt: 0, cbxh: 15 },
  },
  {
    title: "Y tế & Giáo dục",
    desc: "Bệnh viện và trường học công lập đang quá tải trầm trọng.",
    optA: "Thương mại hóa hoàn toàn, ai có tiền mới được dịch vụ tốt",
    effectA: { llsx: 20, ttkt: 20, cbxh: -35 },
    optB: "Cấm tư nhân làm y tế/giáo dục, mọi người xếp hàng chờ đến lượt",
    effectB: { llsx: -10, ttkt: -20, cbxh: 15 },
    optC: "Xã hội hóa: Cho tư nhân mở viện/trường chất lượng cao để chia sẻ gánh nặng với hệ thống công",
    effectC: { llsx: 15, ttkt: 15, cbxh: -5 },
    optD: "Khuyến khích tư nhân làm nhưng Nhà nước khống chế mức học phí, viện phí",
    effectD: { llsx: 5, ttkt: -5, cbxh: 10 },
  },
  {
    title: "Đầu tư Ngân sách",
    desc: "Quốc gia vừa thu được một khoản thặng dư ngân sách rất lớn từ xuất khẩu.",
    optA: "Đầu tư dồn lực vào đường cao tốc, cảng biển và R&D công nghệ lõi",
    effectA: { llsx: 30, ttkt: 15, cbxh: 5 },
    optB: "Phát tiền mặt trực tiếp chia đều cho toàn dân tiêu xài ngắn hạn",
    effectB: { llsx: -5, ttkt: -15, cbxh: 20 },
    optC: "Lập quỹ hỗ trợ hàng ngàn startup nhỏ lẻ",
    effectC: { llsx: 15, ttkt: 5, cbxh: 5 },
    optD: "Chỉ tập trung xây điện, đường, trường, trạm ở vùng sâu vùng xa",
    effectD: { llsx: 5, ttkt: 5, cbxh: 20 },
  },
  {
    title: "Khủng hoảng kinh tế",
    desc: "Đứt gãy chuỗi cung ứng toàn cầu, nhiều nhà máy đóng cửa, công nhân mất việc.",
    optA: "Bơm tiền ngân sách cứu trực tiếp các tập đoàn tư nhân lớn",
    effectA: { llsx: 10, ttkt: 15, cbxh: -20 },
    optB: "Mặc kệ thị trường tự thanh lọc, doanh nghiệp tự sinh tự diệt",
    effectB: { llsx: -15, ttkt: -15, cbxh: -10 },
    optC: "Nhà nước cho vay nhưng yêu cầu thế chấp bằng cổ phần",
    effectC: { llsx: 5, ttkt: 5, cbxh: 5 },
    optD: "Chủ động để DN yếu kém phá sản, dồn tiền hỗ trợ trực tiếp và đào tạo lại nghề cho công nhân",
    effectD: { llsx: 10, ttkt: -5, cbxh: 25 },
  },
  {
    title: "Điều tiết thị trường",
    desc: "Thị trường hàng hóa thiết yếu (xăng dầu, lương thực) biến động giá dữ dội do đầu cơ.",
    optA: "Để quy luật cung cầu tự quyết định, giá lên cao tự khắc sẽ có nguồn cung mới",
    effectA: { llsx: 5, ttkt: 15, cbxh: -30 },
    optB: "Kích hoạt các Tập đoàn Nhà nước chủ lực xả kho, bán bình ổn giá để dẫn dắt thị trường",
    effectB: { llsx: 10, ttkt: 10, cbxh: 20 },
    optC: "Lập đoàn thanh tra đi phạt hành chính các cửa hàng bán lẻ tăng giá",
    effectC: { llsx: 0, ttkt: -5, cbxh: 5 },
    optD: "Sử dụng Luật hình sự để bỏ tù ngay lập tức mọi cá nhân găm hàng",
    effectD: { llsx: -5, ttkt: -10, cbxh: 15 },
  },
];

const statMeta: Record<
  StatKey,
  {
    label: string;
    fullName: string;
    icon: typeof Factory;
  }
> = {
  llsx: {
    label: "LLSX",
    fullName: "Lực lượng sản xuất",
    icon: Factory,
  },
  cbxh: {
    label: "CBXH",
    fullName: "Công bằng xã hội",
    icon: Users,
  },
  ttkt: {
    label: "TTKT",
    fullName: "Tăng trưởng kinh tế",
    icon: TrendingUp,
  },
};

const statOrder: StatKey[] = ["llsx", "cbxh", "ttkt"];

function clampStat(value: number) {
  return Math.max(0, Math.min(100, value));
}

function applyEffect(stats: Stats, effect: Stats): Stats {
  return {
    llsx: clampStat(stats.llsx + effect.llsx),
    cbxh: clampStat(stats.cbxh + effect.cbxh),
    ttkt: clampStat(stats.ttkt + effect.ttkt),
  };
}

function getTotalScore(stats: Stats) {
  return statOrder.reduce((total, key) => total + stats[key], 0);
}

function getProgressTone(value: number) {
  if (value > 70) {
    return {
      bar: "bg-emerald-400",
      text: "text-emerald-300",
      badge: "border-emerald-400/40 bg-emerald-400/10",
    };
  }

  if (value >= 30) {
    return {
      bar: "bg-amber-400",
      text: "text-amber-300",
      badge: "border-amber-400/40 bg-amber-400/10",
    };
  }

  return {
    bar: "bg-red-500",
    text: "text-red-300",
    badge: "border-red-500/40 bg-red-500/10",
  };
}

function getFailureReason(stats: Stats) {
  if (stats.ttkt <= 0) {
    return {
      title: "Phá sản",
      desc: "TTKT về 0: nền kinh tế mất động lực tăng trưởng và ngân sách không còn khả năng chống đỡ.",
    };
  }

  if (stats.cbxh <= 0) {
    return {
      title: "Bất bình đẳng tột độ",
      desc: "CBXH về 0: phân hóa xã hội vượt ngưỡng điều tiết, định hướng phát triển bị đứt gãy.",
    };
  }

  if (stats.llsx <= 0) {
    return {
      title: "Trì trệ nghèo đói",
      desc: "LLSX về 0: lực lượng sản xuất suy kiệt, nền kinh tế không còn nền tảng để chuyển hóa.",
    };
  }

  return null;
}

function StatBar({ statKey, value }: { statKey: StatKey; value: number }) {
  const meta = statMeta[statKey];
  const Icon = meta.icon;
  const tone = getProgressTone(value);

  return (
    <div
      className={cn(
        "rounded-lg border p-3 shadow-lg shadow-black/20",
        tone.badge,
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Icon className={cn("size-4 shrink-0", tone.text)} />
          <div className="min-w-0">
            <div className="text-xs font-black uppercase tracking-wider text-white">
              {meta.label}
            </div>
            <div className="truncate text-[11px] text-slate-400">
              {meta.fullName}
            </div>
          </div>
        </div>
        <span className={cn("text-lg font-black tabular-nums", tone.text)}>
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded bg-slate-800">
        <div
          className={cn(
            "h-full rounded transition-all duration-500 ease-out",
            tone.bar,
          )}
          style={{ width: `${clampStat(value)}%` }}
        />
      </div>
    </div>
  );
}

function ChoiceButton({
  marker,
  label,
  onClick,
}: {
  marker: "A" | "B" | "C" | "D";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-lg border border-slate-700 bg-slate-900/80 p-4 text-left shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-red-700 text-sm font-black text-white shadow-lg shadow-red-950/40 group-hover:bg-amber-500 group-hover:text-slate-950">
          {marker}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-base font-black leading-snug text-white">
              {label}
            </h4>
            <ArrowRight className="mt-1 size-4 shrink-0 text-amber-400 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </button>
  );
}

function RestartButton({ onRestart }: { onRestart: () => void }) {
  return (
    <button
      type="button"
      onClick={onRestart}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-5 py-3 text-sm font-black uppercase tracking-wide text-slate-950 shadow-lg shadow-amber-950/30 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
    >
      <RotateCcw className="size-4" />
      Chơi lại
    </button>
  );
}

function ResultScreen({
  variant,
  title,
  message,
  stats,
  completedTurns,
  onRestart,
}: {
  variant: "success" | "warning" | "failure";
  title: string;
  message: string;
  stats: Stats;
  completedTurns: number;
  onRestart: () => void;
}) {
  const Icon =
    variant === "failure" ? AlertTriangle : variant === "success" ? Trophy : Scale;
  const totalScore = getTotalScore(stats);
  const averageScore = Math.round(totalScore / statOrder.length);

  return (
    <div
      className={cn(
        "rounded-lg border p-6 shadow-2xl shadow-black/30 md:p-8",
        variant === "failure" &&
          "border-red-500/50 bg-red-950/30 shadow-red-950/30",
        variant === "success" &&
          "border-emerald-400/40 bg-emerald-950/20 shadow-emerald-950/20",
        variant === "warning" &&
          "border-amber-400/40 bg-amber-950/20 shadow-amber-950/20",
      )}
    >
        <div className="mb-5 flex size-14 items-center justify-center rounded-lg bg-slate-950/70 text-amber-300">
          <Icon className="size-8" />
        </div>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-amber-300">
          Tổng kết chiến lược
        </p>
        <h3 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          {title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
          {message}
        </p>

        {variant !== "failure" && (
          <div className="mt-8 grid gap-3 rounded-lg border border-amber-400/30 bg-slate-950/70 p-4 sm:grid-cols-3">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Tổng điểm
              </div>
              <div className="mt-1 text-3xl font-black text-amber-300">
                {totalScore}
                <span className="text-base text-slate-500">/300</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Điểm trung bình
              </div>
              <div className="mt-1 text-3xl font-black text-white">
                {averageScore}
                <span className="text-base text-slate-500">/100</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Số lượt hoàn thành
              </div>
              <div className="mt-1 text-3xl font-black text-emerald-300">
                {completedTurns}
                <span className="text-base text-slate-500">/8</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {statOrder.map((key) => (
            <StatBar key={key} statKey={key} value={stats[key]} />
          ))}
        </div>

        <div className="mt-8">
          <RestartButton onRestart={onRestart} />
        </div>
    </div>
  );
}

export default function StrategicTycoonGame() {
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [currentTurn, setCurrentTurn] = useState(0);

  const currentQuestion = questions[currentTurn];
  const failureReason = getFailureReason(stats);
  const isFinished = currentTurn >= questions.length;
  const isStrategicWin = isFinished && stats.llsx > 70 && stats.cbxh > 40;

  const restartGame = () => {
    setStats(INITIAL_STATS);
    setCurrentTurn(0);
  };

  const chooseOption = (effect: Stats) => {
    if (!currentQuestion || failureReason) return;

    setStats((prevStats) => applyEffect(prevStats, effect));
    setCurrentTurn((prevTurn) => prevTurn + 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-lg border border-red-900/50 bg-slate-950 text-white shadow-2xl shadow-red-950/30">
      <div className="relative overflow-hidden border-b border-red-900/40 bg-[radial-gradient(circle_at_top_left,rgba(180,83,9,0.24),transparent_32%),linear-gradient(135deg,rgba(127,29,29,0.42),rgba(15,23,42,0.96)_48%,rgba(2,6,23,1))] p-5 md:p-7">
        <div className="absolute right-6 top-6 hidden text-red-900/30 md:block">
          <Landmark className="size-28" strokeWidth={1} />
        </div>

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-300">
                <Sparkles className="size-4" />
                Mini-game thẻ bài quản lý
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                Định Hướng Chiến Lược
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
                Xây dựng kinh tế thời kỳ quá độ bằng cách cân bằng lực lượng
                sản xuất, công bằng xã hội và tăng trưởng kinh tế qua 8 lượt
                quyết sách.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm shadow-lg shadow-black/20">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Tiến độ
              </div>
              <div className="mt-1 text-2xl font-black text-amber-300">
                {Math.min(currentTurn + (isFinished ? 0 : 1), questions.length)}
                <span className="text-slate-500">/{questions.length}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {statOrder.map((key) => (
              <StatBar key={key} statKey={key} value={stats[key]} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/95 p-4 md:p-6">
        {failureReason ? (
          <ResultScreen
            variant="failure"
            title={failureReason.title}
            message={failureReason.desc}
            stats={stats}
            completedTurns={currentTurn}
            onRestart={restartGame}
          />
        ) : isFinished ? (
          <ResultScreen
            variant={isStrategicWin ? "success" : "warning"}
            title={
              isStrategicWin
                ? "Chúc mừng! Chiến lược quá độ thành công"
                : "Sống sót qua thời kỳ quá độ"
            }
            message={
              isStrategicWin
                ? "Chúc mừng! Bạn chứng minh được việc tồn tại kinh tế tư nhân và phân hóa thu nhập là chiến lược đúng đắn để phát triển LLSX mà không mất đi định hướng XHCN."
                : "Bạn đã vượt qua thời kỳ quá độ, nhưng nền kinh tế vẫn còn nhiều bất ổn."
            }
            stats={stats}
            completedTurns={currentTurn}
            onRestart={restartGame}
          />
        ) : (
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="rounded-lg border border-slate-700 bg-slate-950/60 p-4 shadow-xl shadow-black/20">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-lg bg-red-700 text-white">
                  <Scale className="size-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-amber-300">
                    Nhiệm vụ
                  </div>
                  <h3 className="text-lg font-black text-white">
                    Giữ cân bằng chiến lược
                  </h3>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300">
                <p>
                  Mỗi quyết định đều có mặt được và mất. Chỉ số về 0 sẽ kết
                  thúc ván chơi ngay lập tức.
                </p>
                <p>
                  Hoàn thành 8 lượt với LLSX trên 70 và CBXH trên 40 để đạt
                  kết luận chiến lược tốt nhất.
                </p>
              </div>

              <div className="mt-5 rounded-lg border border-amber-400/20 bg-amber-400/10 p-3 text-xs font-bold leading-relaxed text-amber-100">
                Gợi ý: phát triển lực lượng sản xuất là động lực trung tâm,
                nhưng công bằng xã hội là điều kiện để giữ định hướng.
              </div>
            </aside>

            <main
              key={currentTurn}
              className="rounded-lg border border-red-900/50 bg-slate-950/80 p-5 shadow-2xl shadow-black/30 animate-in fade-in slide-in-from-bottom-2 duration-500 md:p-7"
            >
              <div className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-red-300">
                    Lượt {currentTurn + 1}
                  </div>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-white md:text-4xl">
                    {currentQuestion.title}
                  </h3>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-black uppercase tracking-widest text-amber-300">
                  <Landmark className="size-4" />
                  Hội đồng kinh tế
                </span>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-4">
                <div className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">
                  Bối cảnh
                </div>
                <p className="text-base leading-relaxed text-slate-200 md:text-lg">
                  {currentQuestion.desc}
                </p>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <ChoiceButton
                  marker="A"
                  label={currentQuestion.optA}
                  onClick={() => chooseOption(currentQuestion.effectA)}
                />
                <ChoiceButton
                  marker="B"
                  label={currentQuestion.optB}
                  onClick={() => chooseOption(currentQuestion.effectB)}
                />
                <ChoiceButton
                  marker="C"
                  label={currentQuestion.optC}
                  onClick={() => chooseOption(currentQuestion.effectC)}
                />
                <ChoiceButton
                  marker="D"
                  label={currentQuestion.optD}
                  onClick={() => chooseOption(currentQuestion.effectD)}
                />
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
