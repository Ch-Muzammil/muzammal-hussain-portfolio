"use client";

import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

export type DataPaginationProps = {
  /** 1-based current page */
  page: number;
  /** Total pages (>= 1) */
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many sibling pages around current. Default: 1 */
  siblingCount?: number;
  /** Show prev/next labels on sm+ */
  showLabels?: boolean;
  className?: string;
  /** Disable all controls */
  disabled?: boolean;
};

function range(start: number, end: number) {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

function getPageItems(page: number, pageCount: number, siblingCount: number) {
  if (pageCount <= 1) return [1] as const;

  const totalNumbers = siblingCount * 2 + 5;
  if (pageCount <= totalNumbers) {
    return range(1, pageCount);
  }

  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < pageCount - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + siblingCount * 2;
    return [...range(1, leftCount), "ellipsis-right", pageCount] as const;
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + siblingCount * 2;
    return [1, "ellipsis-left", ...range(pageCount - rightCount + 1, pageCount)] as const;
  }

  return [
    1,
    "ellipsis-left",
    ...range(left, right),
    "ellipsis-right",
    pageCount,
  ] as const;
}

/**
 * Production pagination — page / pageCount / onPageChange.
 *
 * HOW TO USE:
 *   <DataPagination page={page} pageCount={12} onPageChange={setPage} />
 */
export function DataPagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  showLabels = true,
  className,
  disabled = false,
}: DataPaginationProps) {
  const safeCount = Math.max(1, pageCount);
  const safePage = Math.min(Math.max(1, page), safeCount);
  const items = getPageItems(safePage, safeCount, siblingCount);

  const go = (next: number) => {
    if (disabled) return;
    const clamped = Math.min(Math.max(1, next), safeCount);
    if (clamped !== safePage) onPageChange(clamped);
  };

  return (
    <Pagination className={className}>
      <PaginationContent className="flex-wrap justify-center">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text={showLabels ? "Previous" : ""}
            aria-disabled={disabled || safePage <= 1}
            className={cn(
              (disabled || safePage <= 1) && "pointer-events-none opacity-50",
            )}
            onClick={(e) => {
              e.preventDefault();
              go(safePage - 1);
            }}
          />
        </PaginationItem>

        {items.map((item) =>
          typeof item === "string" ? (
            <PaginationItem key={item}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={item === safePage}
                aria-disabled={disabled}
                className={cn(disabled && "pointer-events-none opacity-50")}
                onClick={(e) => {
                  e.preventDefault();
                  go(item);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            text={showLabels ? "Next" : ""}
            aria-disabled={disabled || safePage >= safeCount}
            className={cn(
              (disabled || safePage >= safeCount) &&
                "pointer-events-none opacity-50",
            )}
            onClick={(e) => {
              e.preventDefault();
              go(safePage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
