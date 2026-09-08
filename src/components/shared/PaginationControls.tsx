"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  className?: string;
  itemLabel?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  pageSizeOptions = [25, 50, 100],
  onPageChange,
  onPageSizeChange,
  className,
  itemLabel = "items",
}: PaginationControlsProps) {
  // Generate page numbers with smart ellipsis
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPageNumbers();
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-6",
        className,
      )}
    >
      {/* Left / Top: Page Size Selector & Item Range Info */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500 dark:text-slate-400">
            Per page:
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={(val) => onPageSizeChange(Number(val))}
          >
            <SelectTrigger
              aria-label="Select number of items per page"
              className="h-8 w-[76px] rounded-lg border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 shadow-2xs focus:ring-1 focus:ring-[#0160c4] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <SelectValue placeholder={String(pageSize)} />
            </SelectTrigger>
            <SelectContent className="min-w-[76px] rounded-xl border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              {pageSizeOptions.map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                  className="text-xs font-semibold"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <span className="hidden text-slate-300 sm:inline dark:text-slate-700">
          •
        </span>

        <p className="font-medium text-slate-600 dark:text-slate-400">
          Showing{" "}
          <span className="font-bold text-slate-900 dark:text-white">
            {startItem}–{endItem}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-900 dark:text-white">
            {totalItems}
          </span>{" "}
          {itemLabel}
        </p>
      </div>

      {/* Right / Bottom: Page Navigation */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-center gap-1 sm:justify-end"
        >
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Go to previous page"
            className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <CaretLeft weight="bold" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {pages.map((page, idx) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex h-9 w-7 items-center justify-center text-xs font-bold text-slate-400 dark:text-slate-500"
                  >
                    …
                  </span>
                );
              }

              const isCurrent = page === currentPage;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-semibold transition-all",
                    isCurrent
                      ? "bg-[#0160c4] text-white shadow-2xs dark:bg-[#38b6ff] dark:text-slate-950"
                      : "border border-slate-200 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
                  )}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Go to next page"
            className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <span className="hidden sm:inline">Next</span>
            <CaretRight weight="bold" className="h-3.5 w-3.5" />
          </button>
        </nav>
      )}
    </div>
  );
}

export default PaginationControls;
