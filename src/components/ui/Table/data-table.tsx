"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/Empty";

export type SortDirection = "asc" | "desc";

export type DataTableSort = {
  id: string;
  desc: boolean;
} | null;

export type ColumnAlign = "left" | "center" | "right";

/** Hide column below this Tailwind breakpoint */
export type ColumnBreakpoint = "sm" | "md" | "lg";

export type DataTableColumn<T> = {
  /** Stable column id (also used for sorting key) */
  id: string;
  /** Header label or custom node */
  header: React.ReactNode;
  /** Read value from row for default cell + sorting */
  accessor?: keyof T | ((row: T) => unknown);
  /** Custom cell renderer */
  cell?: (row: T, index: number) => React.ReactNode;
  /** Column width — number = px, or CSS string e.g. "20%", "12rem" */
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  /** Allow sorting this column when DataTable enableSort is true */
  sortable?: boolean;
  align?: ColumnAlign;
  /** Truncate overflowing text with ellipsis */
  truncate?: boolean;
  /** Stick column to the left while scrolling horizontally */
  sticky?: boolean;
  /** Hide on smaller screens (still available on larger) */
  hideBelow?: ColumnBreakpoint;
  className?: string;
  headerClassName?: string;
};

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Unique row id */
  getRowId?: (row: T, index: number) => string;
  /** Turn on sorting UI; per-column still needs sortable: true */
  enableSort?: boolean;
  /** Controlled sort (for server-side). Omit for client-side sort. */
  sort?: DataTableSort;
  onSortChange?: (sort: DataTableSort) => void;
  /** Initial sort when uncontrolled */
  defaultSort?: DataTableSort;
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: React.ReactNode;
  stickyHeader?: boolean;
  density?: "default" | "compact" | "comfortable";
  /** Min width of the table so columns don't crush on mobile (horizontal scroll) */
  minTableWidth?: number | string;
  /** Cap height so stickyHeader sticks inside the table scroll area */
  maxHeight?: number | string;
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  caption?: React.ReactNode;
};

const HIDE_BELOW_CLASS: Record<ColumnBreakpoint, string> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
};

const ALIGN_CLASS: Record<ColumnAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function toCssSize(value: number | string | undefined): string | undefined {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function getCellValue<T>(row: T, column: DataTableColumn<T>): unknown {
  if (!column.accessor) return undefined;
  if (typeof column.accessor === "function") return column.accessor(row);
  return row[column.accessor];
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

/**
 * Production DataTable built on shadcn Table primitives.
 *
 * HOW TO USE:
 *   <DataTable
 *     columns={[
 *       { id: "name", header: "Name", accessor: "name", sortable: true, width: 200 },
 *       { id: "email", header: "Email", accessor: "email", minWidth: 180, hideBelow: "md" },
 *     ]}
 *     data={users}
 *     enableSort
 *     getRowId={(row) => row.id}
 *     stickyHeader
 *   />
 */
export function DataTable<T>({
  columns,
  data,
  getRowId,
  enableSort = false,
  sort: controlledSort,
  onSortChange,
  defaultSort = null,
  isLoading = false,
  loadingRows = 5,
  emptyMessage = "No results.",
  stickyHeader = false,
  density = "default",
  minTableWidth = 640,
  maxHeight,
  onRowClick,
  className,
  caption,
}: DataTableProps<T>) {
  const isControlled = onSortChange != null;
  const [uncontrolledSort, setUncontrolledSort] =
    React.useState<DataTableSort>(defaultSort);

  const sort = isControlled ? (controlledSort ?? null) : uncontrolledSort;

  const setSort = (next: DataTableSort) => {
    if (isControlled) onSortChange?.(next);
    else setUncontrolledSort(next);
  };

  const toggleSort = (columnId: string) => {
    if (!enableSort) return;
    if (sort?.id !== columnId) {
      setSort({ id: columnId, desc: false });
      return;
    }
    if (!sort.desc) {
      setSort({ id: columnId, desc: true });
      return;
    }
    setSort(null);
  };

  const sortedData = React.useMemo(() => {
    if (!enableSort || !sort || isControlled) return data;
    const column = columns.find((c) => c.id === sort.id);
    if (!column) return data;

    const copy = [...data];
    copy.sort((a, b) => {
      const result = compareValues(
        getCellValue(a, column),
        getCellValue(b, column),
      );
      return sort.desc ? -result : result;
    });
    return copy;
  }, [columns, data, enableSort, isControlled, sort]);

  const colStyle = (column: DataTableColumn<T>): React.CSSProperties => ({
    width: toCssSize(column.width),
    minWidth: toCssSize(column.minWidth),
    maxWidth: toCssSize(column.maxWidth),
  });

  const colClass = (column: DataTableColumn<T>, extra?: string) =>
    cn(
      column.align && ALIGN_CLASS[column.align],
      column.hideBelow && HIDE_BELOW_CLASS[column.hideBelow],
      column.sticky &&
        "sticky left-0 z-20 bg-background shadow-[1px_0_0_0_var(--border)]",
      column.className,
      extra,
    );

  return (
    <div className={cn("w-full max-w-full", className)}>
      <Table
        density={density}
        maxHeight={maxHeight}
        style={{ minWidth: toCssSize(minTableWidth) }}
        className="table-fixed"
      >
        {caption ? (
          <caption className="mt-4 caption-bottom text-sm text-muted-foreground">
            {caption}
          </caption>
        ) : null}

        <TableHeader
          className={cn(
            stickyHeader &&
              "sticky top-0 z-30 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80",
          )}
        >
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => {
              const canSort = enableSort && column.sortable;
              const isActive = sort?.id === column.id;
              const ariaSort = !canSort
                ? undefined
                : !isActive
                  ? "none"
                  : sort?.desc
                    ? "descending"
                    : "ascending";

              return (
                <TableHead
                  key={column.id}
                  style={colStyle(column)}
                  aria-sort={ariaSort}
                  className={colClass(
                    column,
                    cn(
                      column.headerClassName,
                      column.sticky && stickyHeader && "z-40",
                    ),
                  )}
                >
                  {canSort ? (
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-sm hover:text-foreground",
                        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                      )}
                      onClick={() => toggleSort(column.id)}
                    >
                      <span>{column.header}</span>
                      {isActive ? (
                        sort?.desc ? (
                          <ArrowDown className="size-3.5 opacity-70" />
                        ) : (
                          <ArrowUp className="size-3.5 opacity-70" />
                        )
                      ) : (
                        <ArrowUpDown className="size-3.5 opacity-40" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: loadingRows }).map((_, rowIndex) => (
                <TableRow key={`loading-${rowIndex}`} className="hover:bg-transparent">
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={colStyle(column)}
                      className={colClass(column)}
                    >
                      <div className="h-4 w-full max-w-[80%]">
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : null}

          {!isLoading && sortedData.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columns.length}
                className="h-auto whitespace-normal p-6"
              >
                {typeof emptyMessage === "string" ? (
                  <EmptyState
                    bordered={false}
                    title={emptyMessage}
                    className="border-0 p-4"
                  />
                ) : (
                  emptyMessage
                )}
              </TableCell>
            </TableRow>
          ) : null}

          {!isLoading &&
            sortedData.map((row, index) => {
              const id = getRowId?.(row, index) ?? String(index);
              return (
                <TableRow
                  key={id}
                  data-row-id={id}
                  className={cn(onRowClick && "cursor-pointer")}
                  onClick={() => onRowClick?.(row, index)}
                >
                  {columns.map((column) => {
                    const content =
                      column.cell?.(row, index) ??
                      String(getCellValue(row, column) ?? "");

                    return (
                      <TableCell
                        key={column.id}
                        style={colStyle(column)}
                        truncate={column.truncate}
                        title={
                          column.truncate && typeof content === "string"
                            ? content
                            : undefined
                        }
                        className={colClass(column)}
                      >
                        {content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
