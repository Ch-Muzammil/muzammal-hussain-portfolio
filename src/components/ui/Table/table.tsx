"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  tableCellVariants,
  tableHeadVariants,
  tableVariants,
} from "./variants";

function Table({
  className,
  density,
  containerClassName,
  maxHeight,
  ...props
}: React.ComponentProps<"table"> &
  VariantProps<typeof tableVariants> & {
    /** Classes on the scroll wrapper (not the <table>) */
    containerClassName?: string;
    /** Enables vertical scroll + sticky header inside the table */
    maxHeight?: number | string;
  }) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full max-w-full overflow-x-auto overscroll-x-contain",
        maxHeight != null && "overflow-y-auto",
        containerClassName,
      )}
      style={
        maxHeight != null
          ? {
              maxHeight:
                typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
            }
          : undefined
      }
    >
      <table
        data-slot="table"
        className={cn(tableVariants({ density }), className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(tableHeadVariants(), className)}
      {...props}
    />
  );
}

function TableCell({
  className,
  truncate,
  ...props
}: React.ComponentProps<"td"> & VariantProps<typeof tableCellVariants>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(tableCellVariants({ truncate }), className)}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  tableVariants,
  tableHeadVariants,
  tableCellVariants,
};
