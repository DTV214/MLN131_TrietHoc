import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Hàm cn (class names) dùng để gộp các class của Tailwind CSS.
 * Nó sử dụng clsx để nối chuỗi điều kiện và twMerge để giải quyết xung đột (override) class.
 * * @param inputs - Danh sách các class Tailwind (có thể là chuỗi, mảng, hoặc object điều kiện)
 * @returns Chuỗi class đã được tối ưu và không bị xung đột
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
