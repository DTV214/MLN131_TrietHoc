"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  GraduationCap,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type OptionKey = "A" | "B" | "C" | "D";

type QuizQuestion = {
  question: string;
  options: Record<OptionKey, string>;
  correctAnswer: OptionKey;
};

const questions: QuizQuestion[] = [
  {
    question:
      "Theo lý luận của chủ nghĩa Mác - Lênin, sự thay thế hình thái kinh tế - xã hội tư bản chủ nghĩa bằng hình thái kinh tế - xã hội cộng sản chủ nghĩa phải trải qua một bước chuyển biến khách quan, đó là:",
    options: {
      A: "Giai đoạn bùng nổ dân số.",
      B: "Thời kỳ quá độ.",
      C: "Thời kỳ nguyên thủy.",
      D: "Sự nhượng bộ của giai cấp tư sản.",
    },
    correctAnswer: "B",
  },
  {
    question:
      "Về phương diện kinh tế, đặc trưng cơ bản nhất của Chủ nghĩa xã hội (mục tiêu cuối cùng) là gì?",
    options: {
      A: "Xóa bỏ hoàn toàn mọi hình thức sở hữu tư nhân ngay lập tức.",
      B: "Trả lương bình quân cho tất cả mọi người.",
      C: "Có nền kinh tế phát triển cao dựa trên chế độ công hữu về tư liệu sản xuất chủ yếu.",
      D: "Xóa bỏ hoàn toàn kinh tế thị trường.",
    },
    correctAnswer: "C",
  },
  {
    question:
      "Theo V.I.Lênin, đặc điểm nổi bật nhất của thời kỳ quá độ lên chủ nghĩa xã hội là gì?",
    options: {
      A: "Sự thống trị tuyệt đối về kinh tế của giai cấp công nhân.",
      B: "Sự đan xen, đấu tranh giữa những yếu tố của xã hội mới và tàn dư của xã hội cũ.",
      C: "Sự phát triển vượt bậc và hoàn thiện của mọi quan hệ xã hội.",
      D: "Xóa bỏ hoàn toàn sự tồn tại của các giai cấp.",
    },
    correctAnswer: "B",
  },
  {
    question:
      "Trong thời kỳ quá độ lên chủ nghĩa xã hội, sự tồn tại của nền kinh tế nhiều thành phần (bao gồm cả kinh tế tư nhân) là do:",
    options: {
      A: "Trình độ của lực lượng sản xuất phát triển chưa đồng đều và còn ở nhiều mức độ khác nhau.",
      B: "Sự buông lỏng quản lý của Nhà nước.",
      C: "Sự nhượng bộ tạm thời đối với giai cấp tư sản.",
      D: "Chủ trương đi ngược lại với lý luận Mác - Lênin.",
    },
    correctAnswer: "A",
  },
  {
    question:
      "Nguyên tắc phân phối cơ bản và chủ đạo nhất trong thời kỳ quá độ lên chủ nghĩa xã hội là gì?",
    options: {
      A: "Phân phối theo nhu cầu (Làm theo năng lực, hưởng theo nhu cầu).",
      B: "Phân phối bình quân, cào bằng.",
      C: "Phân phối theo mức độ đóng góp vốn.",
      D: "Phân phối theo lao động.",
    },
    correctAnswer: "D",
  },
  {
    question:
      "Theo Cương lĩnh xây dựng đất nước (bổ sung, phát triển 2011), Việt Nam quá độ lên Chủ nghĩa xã hội theo hình thức nào?",
    options: {
      A: "Quá độ trực tiếp từ Chủ nghĩa tư bản.",
      B: "Quá độ gián tiếp, bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.",
      C: "Quá độ bỏ qua hoàn toàn nền kinh tế hàng hóa.",
      D: "Quá độ tuần tự qua mọi hình thái kinh tế - xã hội.",
    },
    correctAnswer: "B",
  },
  {
    question:
      "Đâu là một trong những đặc trưng của xã hội XHCN mà nhân dân ta đang xây dựng?",
    options: {
      A: "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh.",
      B: "Nhà nước độc quyền mọi hoạt động sản xuất kinh doanh.",
      C: "Mọi người đều có mức thu nhập hoàn toàn bằng nhau.",
      D: "Xóa bỏ hoàn toàn sự giao lưu kinh tế quốc tế.",
    },
    correctAnswer: "A",
  },
  {
    question:
      "Nếu một nền kinh tế chỉ quan tâm đến tăng trưởng (cho kinh tế tư nhân phát triển không kiểm soát) mà bỏ qua công bằng xã hội, thì nền kinh tế đó đối mặt với nguy cơ gì?",
    options: {
      A: "Tiến nhanh lên Chủ nghĩa cộng sản.",
      B: "Chệch hướng xã hội chủ nghĩa.",
      C: "Trở thành cường quốc công nghiệp.",
      D: "Hoàn thiện nhà nước pháp quyền.",
    },
    correctAnswer: "B",
  },
  {
    question: "Sự tồn tại của kinh tế tư nhân ở Việt Nam hiện nay đóng vai trò gì?",
    options: {
      A: "Là rào cản ngăn cản đất nước tiến lên CNXH.",
      B: "Là một động lực quan trọng của nền kinh tế quốc dân.",
      C: "Là thành phần kinh tế giữ vai trò chủ đạo.",
      D: "Là thành phần kinh tế sẽ bị xóa bỏ trong nhiệm kỳ tới.",
    },
    correctAnswer: "B",
  },
  {
    question:
      "Tiêu chí quan trọng nhất để khẳng định Việt Nam vẫn đang đi đúng định hướng XHCN dù tồn tại kinh tế tư nhân và phân hóa thu nhập là:",
    options: {
      A: "Khuyến khích mọi thành phần kinh tế tự do cạnh tranh không cần luật pháp.",
      B: "Kinh tế nhà nước giữ vai trò chủ đạo, Nhà nước điều tiết nền kinh tế vì mục tiêu phát triển con người, tiến bộ và công bằng xã hội.",
      C: "Chỉ đánh thuế các doanh nghiệp nhà nước.",
      D: "Dùng ngân sách để trả nợ cho các doanh nghiệp tư nhân làm ăn thua lỗ.",
    },
    correctAnswer: "B",
  },
];

const optionKeys: OptionKey[] = ["A", "B", "C", "D"];

function getResultMessage(score: number) {
  if (score === questions.length) return "Xuất sắc. Bạn nắm bài rất chắc.";
  if (score >= 8) return "Rất tốt. Bạn đã hiểu phần trọng tâm của bài giảng.";
  if (score >= 6) return "Ổn rồi. Nên đọc lại các ý về thời kỳ quá độ và phân phối.";
  return "Cần ôn lại. Hãy xem lại phần lý luận trước khi làm lại quiz.";
}

export default function QuizReview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<OptionKey | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const hasAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progressPercent = ((currentIndex + (isFinished ? 1 : 0)) / questions.length) * 100;

  const resultMessage = useMemo(() => getResultMessage(score), [score]);

  const chooseAnswer = (answer: OptionKey) => {
    if (hasAnswered) return;

    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const goNext = () => {
    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer(null);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <section className="min-h-screen w-full px-4 pb-20 pt-32 md:px-10">
        <div className="mx-auto max-w-5xl rounded-lg border border-amber-400/30 bg-slate-950/90 p-6 text-white shadow-2xl shadow-black/40 md:p-10">
          <div className="mb-6 flex size-16 items-center justify-center rounded-lg bg-amber-500 text-slate-950">
            <GraduationCap className="size-9" />
          </div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-amber-300">
            Tổng kết Quiz Review
          </p>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">
            Bạn đạt {score}/{questions.length} câu đúng
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            {resultMessage}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-5">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Điểm số
              </div>
              <div className="mt-2 text-4xl font-black text-amber-300">
                {score}/{questions.length}
              </div>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-5">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Tỷ lệ đúng
              </div>
              <div className="mt-2 text-4xl font-black text-emerald-300">
                {percentage}%
              </div>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-5">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Số câu
              </div>
              <div className="mt-2 text-4xl font-black text-white">
                {questions.length}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={restartQuiz}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-5 py-3 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-amber-400"
            >
              <RotateCcw className="size-4" />
              Làm lại quiz
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-900 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:border-amber-400 hover:text-amber-300"
            >
              <ArrowLeft className="size-4" />
              Về bài giảng
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full px-4 pb-20 pt-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-lg border border-red-900/50 bg-slate-950/90 p-5 text-white shadow-2xl shadow-black/30 md:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-300">
              <BookOpenCheck className="size-4" />
              Quiz Review
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              Ôn tập bài giảng CNXH
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Chọn một đáp án cho mỗi câu. Sau khi chọn, hệ thống sẽ hiện ngay
              đáp án đúng để bạn review lại kiến thức.
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3">
            <div className="text-xs font-black uppercase tracking-widest text-slate-400">
              Điểm hiện tại
            </div>
            <div className="mt-1 text-2xl font-black text-amber-300">
              {score}/{questions.length}
            </div>
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded bg-slate-800">
          <div
            className="h-2 rounded bg-amber-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-950/90 p-5 text-white shadow-2xl shadow-black/30 md:p-8">
          <div className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.24em] text-red-300">
                Câu {currentIndex + 1}/{questions.length}
              </div>
              <h2 className="mt-3 text-xl font-black leading-snug md:text-3xl">
                {currentQuestion.question}
              </h2>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {optionKeys.map((key) => {
              const isSelected = selectedAnswer === key;
              const isCorrectOption = currentQuestion.correctAnswer === key;
              const showCorrect = hasAnswered && isCorrectOption;
              const showWrong = hasAnswered && isSelected && !isCorrectOption;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => chooseAnswer(key)}
                  disabled={hasAnswered}
                  className={cn(
                    "group flex min-h-24 items-start gap-3 rounded-lg border border-slate-700 bg-slate-900 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 disabled:cursor-default disabled:hover:translate-y-0",
                    showCorrect && "border-emerald-400 bg-emerald-950/50",
                    showWrong && "border-red-400 bg-red-950/50",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-md bg-red-700 text-sm font-black text-white",
                      showCorrect && "bg-emerald-500 text-slate-950",
                      showWrong && "bg-red-500",
                    )}
                  >
                    {key}
                  </span>
                  <span className="flex-1 text-sm font-bold leading-relaxed text-slate-100 md:text-base">
                    {currentQuestion.options[key]}
                  </span>
                  {showCorrect && <CheckCircle2 className="size-5 shrink-0 text-emerald-300" />}
                  {showWrong && <XCircle className="size-5 shrink-0 text-red-300" />}
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div
              className={cn(
                "mt-6 rounded-lg border p-4",
                isCorrect
                  ? "border-emerald-400/40 bg-emerald-950/40"
                  : "border-red-400/40 bg-red-950/40",
              )}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="mt-1 size-6 shrink-0 text-emerald-300" />
                ) : (
                  <XCircle className="mt-1 size-6 shrink-0 text-red-300" />
                )}
                <div>
                  <h3 className="font-black text-white">
                    {isCorrect ? "Chính xác!" : "Chưa đúng."}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300 md:text-base">
                    Đáp án đúng là{" "}
                    <span className="font-black text-amber-300">
                      {currentQuestion.correctAnswer}.{" "}
                      {currentQuestion.options[currentQuestion.correctAnswer]}
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={goNext}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-5 py-3 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-amber-400"
              >
                {currentIndex === questions.length - 1 ? "Xem tổng kết" : "Câu tiếp theo"}
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
